import { Module } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { BookingController } from "./booking.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "./entities/booking.entity";
import { Service } from "src/service/entities/service.entity";
import { Car } from "src/car/entities/car.entity";
import { ScheduleModule } from "src/schedule/schedule.module";
//import { SheduleService } from "src/shedule/shedule.service";

@Module({
	controllers: [BookingController],
	providers: [BookingService],
	imports: [TypeOrmModule.forFeature([Booking, Service, Car]), ScheduleModule],
	exports: [BookingService]
})
export class BookingModule {}
