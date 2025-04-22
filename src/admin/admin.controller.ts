import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { BookingService } from 'src/booking/booking.service';
import { ServiceService } from 'src/service/service.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly serviceService: ServiceService
  ) { }

  // SERVICES ###############################
  // @Post()
  // createService(@Body() dto: CreateAdminDto) {
  //   //!TODO
  // }

  // @Get()
  // findAll() {
  //   return this.serviceService.findAll();
  // }

  // @Get(':id')
  // findOneService(@Param('id') id: string) {
  //   return this.serviceService.findOne(id);
  // }

  // @Patch(':id')
  // updateService(@Param('id') id: string, @Body() dto: UpdateAdminDto) {
  //   return this.serviceService.update(id, dto);
  // }

  // @Delete(':id')
  // removeService(@Param('id') id: string) {
  //   return this.serviceService.remove(id);
  // }

  // // BOOKINGS #####################
  // @Post()
  // createBooking(@Body() dto: CreateAdminDto) {
  //   //!TODO
  // }

  // @Get()
  // findAllBookings() {
  //   return this.bookingService.findAll();
  // }

  // @Get(':id')
  // findOneBooking(@Param('id') id: string) {
  //   return this.bookingService.findOne(id);
  // }

  // @Patch(':id')
  // updateBooking(@Param('id') id: string, @Body() dto: UpdateAdminDto) {
  //   return this.bookingService.update(id, dto);
  // }

  // @Delete(':id')
  // removeBooking(@Param('id') id: string) {
  //   return this.bookingService.remove(id);
  // }
}
