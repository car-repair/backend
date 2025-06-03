import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Routes } from '../common/routes';

@Controller()
export class BookingPublicController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(Routes.Booking.CREATE)
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get(Routes.Booking.SLOTS)
  findFreeSlots(@Query('date') date: string) {
    return this.bookingService.findFreeSlots(date);
  }

}
