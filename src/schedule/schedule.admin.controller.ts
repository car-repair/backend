import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ScheduleService, ITimeSlot } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { CreateScheduleExceptionDto } from './dto/create-schedule-exception.dto';
import { UpdateScheduleExceptionDto } from './dto/update-schedule-exception.dto';
import { Schedule } from './entities/schedule.entity';
import { ScheduleException } from './entities/schedule-exception.entity';
import { AdminRoutes } from '../common/routes';
import { AdminJWTGuard } from '../common/guards/admin.guard';

@Controller()
@UseGuards(AdminJWTGuard)
export class ScheduleAdminController {
  constructor(private readonly scheduleService: ScheduleService) {}

  // Base schedule
  @Post(AdminRoutes.Schedule.CREATE)
  create(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get(AdminRoutes.Schedule.LIST)
  findAll(): Promise<Schedule[]> {
    return this.scheduleService.findAll();
  }

  @Get(AdminRoutes.Schedule.GET_ONE)
  findOne(@Param('id') id: string): Promise<Schedule> {
    return this.scheduleService.findOne(id);
  }

  @Put(AdminRoutes.Schedule.GET_ONE)
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(AdminRoutes.Schedule.GET_ONE)
  remove(@Param('id') id: string): Promise<void> {
    return this.scheduleService.remove(id);
  }

  // Exceptions
  @Post(AdminRoutes.Schedule.Exceptions.CREATE)
  createException(@Body() createScheduleExceptionDto: CreateScheduleExceptionDto): Promise<ScheduleException> {
    return this.scheduleService.createException(createScheduleExceptionDto);
  }

  @Get(AdminRoutes.Schedule.Exceptions.LIST)
  findAllExceptions(): Promise<ScheduleException[]> {
    return this.scheduleService.findAllExceptions();
  }

  @Get(AdminRoutes.Schedule.Exceptions.GET_ONE)
  findOneException(@Param('id') id: string): Promise<ScheduleException> {
    return this.scheduleService.findOneException(id);
  }

  @Put(AdminRoutes.Schedule.Exceptions.GET_ONE)
  updateException(@Param('id') id: string, @Body() updateScheduleExceptionDto: UpdateScheduleExceptionDto): Promise<ScheduleException> {
    return this.scheduleService.updateException(id, updateScheduleExceptionDto);
  }

  @Delete(AdminRoutes.Schedule.Exceptions.GET_ONE)
  removeException(@Param('id') id: string): Promise<void> {
    return this.scheduleService.removeException(id);
  }

}