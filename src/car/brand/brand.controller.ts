import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@Body('name') name: string): Promise<Brand> {
    return this.brandService.create(name);
  }

  @Get()
  findAll(): Promise<Brand[]> {
    return this.brandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('name') name: string) {
    return this.brandService.update(id, name);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.brandService.remove(id);
  }
}