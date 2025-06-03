import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceService } from './service.service';
import { Routes } from '../common/routes';

@Controller()
export class ServicePublicController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get(Routes.Service.LIST)
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(Routes.Service.GET_ONE)
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

}
