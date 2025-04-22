import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ScheduleService, ITimeSlot } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { CreateScheduleExceptionDto } from './dto/create-schedule-exception.dto';
import { UpdateScheduleExceptionDto } from './dto/update-schedule-exception.dto';
import { Schedule } from './entities/schedule.entity';
import { ScheduleException } from './entities/schedule-exception.entity';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get('list')
  findAll(): Promise<Schedule[]> {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Schedule> {
    return this.scheduleService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.scheduleService.remove(id);
  }

  @Post('exceptions')
  createException(@Body() createScheduleExceptionDto: CreateScheduleExceptionDto): Promise<ScheduleException> {
    return this.scheduleService.createException(createScheduleExceptionDto);
  }

  @Get('exceptions/list')
  findAllExceptions(): Promise<ScheduleException[]> {
    return this.scheduleService.findAllExceptions();
  }

  @Get('exceptions/:id')
  findOneException(@Param('id') id: string): Promise<ScheduleException> {
    return this.scheduleService.findOneException(id);
  }

  @Put('exceptions/:id')
  updateException(@Param('id') id: string, @Body() updateScheduleExceptionDto: UpdateScheduleExceptionDto): Promise<ScheduleException> {
    return this.scheduleService.updateException(id, updateScheduleExceptionDto);
  }

  @Delete('exceptions/:id')
  removeException(@Param('id') id: string): Promise<void> {
    return this.scheduleService.removeException(id);
  }

  @Get('free-slots/:date')
  findFreeSlots(@Param('date') date: string): Promise<ITimeSlot[]> {
    return this.scheduleService.findFreeSlots(date);
  }
}