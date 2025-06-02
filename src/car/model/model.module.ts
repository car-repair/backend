import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { ModelService } from './model.service';
//import { ModelController } from './model.controller';
import { Brand } from '../brand/entities/brand.entity'; // Обновляем путь

@Module({
  imports: [TypeOrmModule.forFeature([Model, Brand])],
  providers: [ModelService],
  //controllers: [ModelController],
  exports: [ModelService],
})
export class ModelModule {}