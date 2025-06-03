import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { ModelService } from '../model/model.service';
import { Brand } from './entities/brand.entity';
import { Model } from '../model/entities/model.entity';
import { IsString, IsNotEmpty } from 'class-validator';
import { AdminRoutes } from '../../common/routes';
import { AdminJWTGuard } from '../../common/guards/admin.guard';

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
@UseGuards(AdminJWTGuard)
export class BrandAdminController {
  constructor(
    private readonly brandService: BrandService,
    private readonly modelService: ModelService,
  ) {}

  // Brand CRUD
  @Post(AdminRoutes.Brand.CREATE)
  create(@Body('name') name: string): Promise<Brand> {
    return this.brandService.create(name);
  }

  @Get(AdminRoutes.Brand.LIST)
  list(): Promise<Brand[]> {
    return this.brandService.findAll();
  }

  @Get(AdminRoutes.Brand.GET_ONE)
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Put(AdminRoutes.Brand.GET_ONE)
  update(@Param('id') id: string, @Body('name') name: string) {
    return this.brandService.update(id, name);
  }

  @Delete(AdminRoutes.Brand.GET_ONE)
  remove(@Param('id') id: string): Promise<void> {
    return this.brandService.remove(id);
  }

  // Model CRUD
  @Post(AdminRoutes.Brand.Model.CREATE)
  async createModel(@Param('id') brandId: string, @Body() createModelDto: CreateModelDto): Promise<Model> {
    await this.brandService.findOne(brandId);
    return this.modelService.create(createModelDto.name, brandId);
  }

  @Get(AdminRoutes.Brand.Model.LIST)
  listModels(@Param('id') brandId: string): Promise<Model[]> {
    return this.modelService.findByBrand(brandId);
  }

  @Get(AdminRoutes.Brand.Model.GET_ONE)
  async findOneModel(@Param('id') brandId: string, @Param('modelId') modelId: string)  {
    const model = await this.modelService.findOne(modelId);
    if (model?.brand.id !== brandId) {
      throw new BadRequestException('Model does not belong to this brand');
    }
    return model;
  }

  @Put(AdminRoutes.Brand.Model.GET_ONE)
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

  @Delete(AdminRoutes.Brand.Model.GET_ONE)
  async deleteModel(@Param('id') brandId: string, @Param('modelId') modelId: string): Promise<void> {
    const model = await this.modelService.findOne(modelId);
    if (model?.brand.id !== brandId) {
      throw new BadRequestException('Model does not belong to this brand');
    }
    return this.modelService.remove(modelId);
  }
}