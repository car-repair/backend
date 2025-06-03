import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AdminRoutes } from '../common/routes';
import { AdminJWTGuard } from '../common/guards/admin.guard';

@Controller()
@UseGuards(AdminJWTGuard)
export class ServiceAdminController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post(AdminRoutes.Service.CREATE)
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get(AdminRoutes.Service.LIST)
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(AdminRoutes.Service.GET_ONE)
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(AdminRoutes.Service.GET_ONE)
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(AdminRoutes.Service.GET_ONE)
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
