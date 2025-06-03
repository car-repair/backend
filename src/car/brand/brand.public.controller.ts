import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException } from '@nestjs/common';
import { BrandService } from './brand.service';
import { ModelService } from '../model/model.service';
import { Brand } from './entities/brand.entity';
import { Model } from '../model/entities/model.entity';
import { IsString, IsNotEmpty } from 'class-validator';
import { Routes } from 'src/common/routes';

class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

class UpdateModelDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

@Controller()
export class BrandPublicController {
  constructor(
    private readonly brandService: BrandService,
    private readonly modelService: ModelService,
  ) {}

  // Brand CRUD
  @Get(Routes.Brand.LIST)
  list(): Promise<Brand[]> {
    return this.brandService.findAll();
  }

  // Model CRUD
  @Get(Routes.Brand.Model.LIST)
  listModels(@Param('id') brandId: string): Promise<Model[]> {
    return this.modelService.findByBrand(brandId);
  }

}