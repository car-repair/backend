import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException } from '@nestjs/common';
import { BrandService } from './brand.service';
import { ModelService } from '../model/model.service';
import { Brand } from './entities/brand.entity';
import { Model } from '../model/entities/model.entity';
import { IsString, IsNotEmpty } from 'class-validator';

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

@Controller('brand')
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    private readonly modelService: ModelService,
  ) {}

  // Brand CRUD
  @Post()
  create(@Body('name') name: string): Promise<Brand> {
    return this.brandService.create(name);
  }

  @Get('list')
  list(): Promise<Brand[]> {
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

  // Model CRUD
  @Post(':id/model')
  async createModel(@Param('id') brandId: string, @Body() createModelDto: CreateModelDto): Promise<Model> {
    await this.brandService.findOne(brandId);
    return this.modelService.create(createModelDto.name, brandId);
  }

  @Get(':id/model/list')
  listModels(@Param('id') brandId: string): Promise<Model[]> {
    return this.modelService.findByBrand(brandId);
  }

  @Get(':id/model/:modelId')
  async findOneModel(@Param('id') brandId: string, @Param('modelId') modelId: string)  {
    const model = await this.modelService.findOne(modelId);
    if (model?.brand.id !== brandId) {
      throw new BadRequestException('Model does not belong to this brand');
    }
    return model;
  }

  @Put(':id/model/:modelId')
  async updateModel(
    @Param('id') brandId: string,
    @Param('modelId') modelId: string,
    @Body() updateModelDto: UpdateModelDto,
  ): Promise<Model> {
    const model = await this.modelService.findOne(modelId);
    if (model?.brand.id !== brandId) {
      throw new BadRequestException('Model does not belong to this brand');
    }
    return this.modelService.update(modelId, updateModelDto.name, brandId);
  }

  @Delete(':id/model/:modelId')
  async deleteModel(@Param('id') brandId: string, @Param('modelId') modelId: string): Promise<void> {
    const model = await this.modelService.findOne(modelId);
    if (model?.brand.id !== brandId) {
      throw new BadRequestException('Model does not belong to this brand');
    }
    return this.modelService.remove(modelId);
  }
}