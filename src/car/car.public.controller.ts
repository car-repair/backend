import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Routes } from '../common/routes';

@Controller()
export class CarPublicController {
  constructor(private readonly carService: CarService) {}

  @Get(Routes.Car.LIST)
  findAll() {
    return this.carService.findAll();
  }

}
