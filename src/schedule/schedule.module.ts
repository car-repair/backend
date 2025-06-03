import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleAdminController } from './schedule.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../booking/entities/booking.entity';
import { Schedule } from './entities/schedule.entity';
import { ScheduleException } from './entities/schedule-exception.entity';

@Module({
  controllers: [ScheduleAdminController],
  providers: [ScheduleService],
  imports: [TypeOrmModule.forFeature([Schedule, ScheduleException, Booking])],
  exports: [ScheduleService]
})
export class ScheduleModule {}
