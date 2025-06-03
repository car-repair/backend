import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarPublicController } from './car.public.controller';
import { CarAdminController } from './car.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { Model } from './model/entities/model.entity';

@Module({
  controllers: [CarPublicController, CarAdminController],
  providers: [CarService],
  imports: [TypeOrmModule.forFeature([Car, Model]), BrandModule, ModelModule]
})
export class CarModule {}
