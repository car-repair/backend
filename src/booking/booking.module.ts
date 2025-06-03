import { Module } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { BookingPublicController } from "./booking.public.controller";
import { BookingAdminController } from "./booking.admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "./entities/booking.entity";
import { Service } from "../service/entities/service.entity";
import { Car } from "../car/entities/car.entity";
import { ScheduleModule } from "../schedule/schedule.module";
import { TelegramModule } from "../telegram/telegram.module";

@Module({
	controllers: [BookingPublicController, BookingAdminController],
	providers: [BookingService],
	imports: [TypeOrmModule.forFeature([Booking, Service, Car]), ScheduleModule, TelegramModule],
	exports: [BookingService]
})
export class BookingModule {}
