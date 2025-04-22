import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { Booking } from "./entities/booking.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Service } from "src/service/entities/service.entity";
import { Car } from "src/car/entities/car.entity";
import { BOOKING_DURATION_HOURS, ScheduleService } from "src/schedule/schedule.service";
import { DateTime } from "luxon";

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
		private readonly scheduleService: ScheduleService

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

		const car = await this.carRepo.findOneBy({ id: dto.carId })

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

		return this.bookingRepo.save(booking);
	}

	async findAll(): Promise<Booking[]> {
		return this.bookingRepo.find()
	}

	async findOne(id: string): Promise<Booking> {
		const booking = await this.bookingRepo.findOneBy({ id: id })
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
