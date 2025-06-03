import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AdminRoutes } from '../common/routes';
import { AdminJWTGuard } from '../common/guards/admin.guard';

@Controller()
@UseGuards(AdminJWTGuard)
export class BookingAdminController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(AdminRoutes.Booking.CREATE)
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get(AdminRoutes.Booking.LIST)
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(AdminRoutes.Booking.SLOTS)
  findFreeSlots(@Query('date') date: string) {
    return this.bookingService.findFreeSlots(date);
  }

  @Get(AdminRoutes.Booking.GET_ONE)
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Patch(AdminRoutes.Booking.GET_ONE)
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @Delete(AdminRoutes.Booking.GET_ONE)
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
