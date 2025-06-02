// import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
// import { ModelService } from './model.service';
// import { Model } from './entities/model.entity';

// @Controller('model')
// export class ModelController {
//   constructor(private readonly modelService: ModelService) {}

//   @Post()
//   create(@Body('name') name: string, @Body('brandId') brandId: string): Promise<Model> {
//     return this.modelService.create(name, brandId);
//   }

//   // @Get('list')
//   // findAll(): Promise<Model[]> {
//   //   return this.modelService.findAll();
//   // }

//   @Get('brand/:brandId')
//   findByBrand(@Param('brandId') brandId: string): Promise<Model[]> {
//     return this.modelService.findByBrand(brandId);
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.modelService.findOne(id);
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body('name') name: string, @Body('brandId') brandId: string): Promise<Model> {
//     return this.modelService.update(id, name, brandId);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.modelService.remove(id);
//   }
// }