import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { Model } from './model/entities/model.entity';

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [TypeOrmModule.forFeature([Car, Model]), BrandModule, ModelModule]
})
export class CarModule {}
