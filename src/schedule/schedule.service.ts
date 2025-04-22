import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { CreateScheduleExceptionDto } from './dto/create-schedule-exception.dto';
import { UpdateScheduleExceptionDto } from './dto/update-schedule-exception.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { ScheduleException } from './entities/schedule-exception.entity';
import { Booking } from 'src/booking/entities/booking.entity';
import { DateTime } from 'luxon';

export interface ITimeSlot {
  startsAt: string;
  endsAt: string;
}

export const BOOKING_DURATION_HOURS = 1;

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
    @InjectRepository(ScheduleException)
    private scheduleExceptionRepo: Repository<ScheduleException>,
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
  ) {}

  async create(dto: CreateScheduleDto): Promise<Schedule> {
    const existingSchedule = await this.scheduleRepo.findOne({
      where: { dayOfWeek: dto.dayOfWeek },
    });
    if (existingSchedule) {
      throw new BadRequestException(
        `Schedule for ${dto.dayOfWeek} already exists`,
      );
    }

    const schedule = this.scheduleRepo.create(dto);
    return this.scheduleRepo.save(schedule);
  }

  async findAll(): Promise<Schedule[]> {
    return this.scheduleRepo.find();
  }

  async findOne(id: string): Promise<Schedule> {
    const schedule = await this.scheduleRepo.findOne({ where: { id } });
    if (!schedule) {
      throw new BadRequestException(`Schedule with id ${id} not found`);
    }
    return schedule;
  }

  async update(id: string, dto: UpdateScheduleDto): Promise<Schedule> {
    const schedule = await this.findOne(id);
    await this.scheduleRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const schedule = await this.findOne(id);
    await this.scheduleRepo.remove(schedule);
  }

  async createException(dto: CreateScheduleExceptionDto): Promise<ScheduleException> {
    const existingException = await this.scheduleExceptionRepo.findOne({
      where: { date: dto.date },
    });
    if (existingException) {
      throw new BadRequestException(
        `Exception for date ${dto.date} already exists`,
      );
    }

    const exception = this.scheduleExceptionRepo.create(dto);
    return this.scheduleExceptionRepo.save(exception);
  }

  async findAllExceptions(): Promise<ScheduleException[]> {
    return this.scheduleExceptionRepo.find();
  }

  async findOneException(id: string): Promise<ScheduleException> {
    const exception = await this.scheduleExceptionRepo.findOne({ where: { id } });
    if (!exception) {
      throw new BadRequestException(`Exception with id ${id} not found`);
    }
    return exception;
  }

  async updateException(id: string, dto: UpdateScheduleExceptionDto): Promise<ScheduleException> {
    const exception = await this.findOneException(id);
    await this.scheduleExceptionRepo.update(id, dto);
    return this.findOneException(id);
  }

  async removeException(id: string): Promise<void> {
    const exception = await this.findOneException(id);
    await this.scheduleExceptionRepo.remove(exception);
  }

  async findFreeSlots(date: string): Promise<ITimeSlot[]> {
    const targetDate = DateTime.fromISO(date, { zone: 'Asia/Yekaterinburg' });
    if (!targetDate.isValid) {
      throw new BadRequestException(`Invalid date format: ${date}. Expected format: YYYY-MM-DD`);
    }

    try {
      // Проверяем, есть ли исключение для этой даты
      const exception = await this.scheduleExceptionRepo.findOne({
        where: { date: targetDate.toISODate() },
      });

      if (exception) {
        // Если есть исключение и день нерабочий (startTime и endTime = null), возвращаем пустой массив
        if (!exception.startTime || !exception.endTime) {
          return [];
        }

        // Используем время из исключения
        const startHour = parseInt(exception.startTime.split(':')[0], 10);
        const endHour = parseInt(exception.endTime.split(':')[0], 10);
        return this.generateFreeSlots(targetDate, startHour, endHour);
      }

      // Если исключения нет, используем расписание для дня недели
      const dayOfWeek = targetDate.weekday; // 1 = Monday, ..., 7 = Sunday
      const dayOfWeekString = this.mapWeekdayToString(dayOfWeek);

      const schedule = await this.scheduleRepo.findOne({
        where: { dayOfWeek: dayOfWeekString },
      });

      if (!schedule || schedule.isDayOff || !schedule.startTime || !schedule.endTime) {
        // Если расписания нет, день выходной или время не указано, возвращаем пустой массив
        return [];
      }

      const startHour = parseInt(schedule.startTime.split(':')[0], 10);
      const endHour = parseInt(schedule.endTime.split(':')[0], 10);
      return this.generateFreeSlots(targetDate, startHour, endHour);

    } catch (e) {
      console.error(`findFreeSlots error: ${e.message}`);
      throw new BadRequestException('Invalid params');
    }
  }

  private async generateFreeSlots(targetDate: DateTime, startHour: number, endHour: number): Promise<ITimeSlot[]> {
    const startOfDay = targetDate.startOf('day');
    const endOfDay = targetDate.endOf('day');

    // Выборка бронирований за день
    const bookings = await this.bookingRepo
      .createQueryBuilder('booking')
      .where('booking.startsAt >= :start', { start: startOfDay.toISO() })
      .andWhere('booking.startsAt <= :end', { end: endOfDay.toISO() })
      .getMany();

    // Генерируем все возможные слоты
    const allSlots: ITimeSlot[] = [];
    let currentHour = startHour;
    while (currentHour + BOOKING_DURATION_HOURS <= endHour) {
      const startTime = targetDate.set({ hour: currentHour, minute: 0 });
      const endTime = startTime.plus({ hours: BOOKING_DURATION_HOURS });
      allSlots.push({
        startsAt: startTime.toFormat('HH:mm'),
        endsAt: endTime.toFormat('HH:mm'),
      });
      currentHour += BOOKING_DURATION_HOURS;
    }

    // Определяем занятые слоты
    const bookedSlots: string[] = [];
    bookings.forEach((booking) => {
      const start = DateTime.fromJSDate(booking.startsAt, { zone: 'Asia/Yekaterinburg' });
      const end = DateTime.fromJSDate(booking.endsAt, { zone: 'Asia/Yekaterinburg' });
      if (!start.isValid || !end.isValid) {
        console.warn(`Invalid booking times for booking ${booking.id}`);
        return;
      }
      let current = start;
      while (current < end) {
        bookedSlots.push(current.toFormat('HH:mm'));
        current = current.plus({ hours: BOOKING_DURATION_HOURS });
      }
    });

    // Фильтруем свободные слоты
    const freeSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot.startsAt),
    );
    return freeSlots;
  }

  private mapWeekdayToString(weekday: number): string {
    const daysMap: { [key: number]: string } = {
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
      7: 'Sunday',
    };
    return daysMap[weekday] || 'Monday'; // По умолчанию Monday
  }
}