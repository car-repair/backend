import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { Booking } from "./entities/booking.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Service } from "../service/entities/service.entity";
import { Car } from "../car/entities/car.entity";
import { BOOKING_DURATION_HOURS, ScheduleService } from "../schedule/schedule.service";
import { DateTime } from "luxon";
import { TelegramService } from "../telegram/telegram.service";

@Injectable()
export class BookingService {
	constructor(
		@InjectRepository(Booking)
		private bookingRepo: Repository<Booking>,
		@InjectRepository(Service)
		private serviceRepo: Repository<Service>,
		@InjectRepository(Car)
		private carRepo: Repository<Car>,
		@Inject(ScheduleService)
		private readonly scheduleService: ScheduleService,
		private readonly tgService: TelegramService,

	) { }
	async create(dto: CreateBookingDto): Promise<Booking> {
		const services = await this.serviceRepo.find({
			where: { id: In(dto.servicesIds) },
		});

		if (services.length !== dto.servicesIds?.length) {
			throw new BadRequestException('One or more services not found');
		}

		const startsAt = DateTime.fromISO(dto.startsAt, { zone: 'Asia/Yekaterinburg' });
		if (!startsAt.isValid) {
			throw new BadRequestException('Invalid startsAt format');
		}

		const endsAt = startsAt.plus({ hours: BOOKING_DURATION_HOURS });

		const car = await this.carRepo.findOne({
            where: { id: dto.carId },
            relations: ['brand', 'model'],
        });

		if (!car) {
			throw new BadRequestException(`Car with ${dto.carId} not found`)
		}

		const booking = this.bookingRepo.create({
			startsAt: startsAt.toJSDate(),
			endsAt: endsAt.toJSDate(),
			services: services,
			car: car,
			firstname: dto.firstname,
			lastname: dto.lastname,
			phone: dto.phone,
			comment: dto.comment,
		});

		const saved = await this.bookingRepo.save(booking);

		await this.tgService.sendBookingNotification(saved);

		return saved;
	}

	async findAll(
		onlyActive?: boolean,
		week?: string
	  ): Promise<Booking[]> {
		const bookings = await this.bookingRepo.find({
		  relations: ['car', 'services'],
		});
	  
		// Фильтрация на основе параметров
		return bookings.filter((booking) => {
		  const startsAt = DateTime.fromJSDate(booking.startsAt, { zone: 'Asia/Yekaterinburg' });
		  const currentTime = DateTime.now().setZone('Asia/Yekaterinburg');
	  
		  // Фильтр "Только актуальные"
		  if (onlyActive && startsAt < currentTime) {
			return false;
		  }
	  
		  // Фильтр по неделе
		  if (week) {
			const [startWeek, endWeek] = week.split('_').map((date) =>
			  DateTime.fromISO(date, { zone: 'Asia/Yekaterinburg' })
			);
			return startsAt >= startWeek && startsAt <= endWeek;
		  }
	  
		  return true;
		});
	  }

	async findOne(id: string): Promise<Booking> {
		const booking = await this.bookingRepo.findOne({ 
			where: { id: id },
			relations: ['car', 'car.brand', 'car.model', 'services']
		})
		if (!booking) {
			throw new BadRequestException(`Booking with id ${id} not found`)
		}
		return booking
	}

	update(id: string, dto: UpdateBookingDto) {
		return `This action updates a #${id} booking`;
	}

	remove(id: string) {
		return `This action removes a #${id} booking`;
	}

	async findFreeSlots(date: string) {
		return this.scheduleService.findFreeSlots(date)
	}
}
