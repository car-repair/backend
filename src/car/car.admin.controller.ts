import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AdminRoutes } from '../common/routes';
import { AdminJWTGuard } from 'src/common/guards/admin.guard';

@Controller()
@UseGuards(AdminJWTGuard)
export class CarAdminController {
  constructor(private readonly carService: CarService) {}

  @Post(AdminRoutes.Car.CREATE)
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get(AdminRoutes.Car.LIST)
  findAll() {
    return this.carService.findAll();
  }

  @Get(AdminRoutes.Car.GET_ONE)
  findOne(@Param('id') id: string) {
    return this.carService.findOne(id);
  }

  @Patch(AdminRoutes.Car.GET_ONE)
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(id, updateCarDto);
  }

  @Delete(AdminRoutes.Car.GET_ONE)
  remove(@Param('id') id: string) {
    return this.carService.remove(id);
  }
}
