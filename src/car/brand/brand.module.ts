import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { BrandService } from './brand.service';
import { BrandPublicController } from './brand.public.controller';
import { BrandAdminController } from './brand.admin.controller';
import { ModelModule } from '../model/model.module';

@Module({
  imports: [TypeOrmModule.forFeature([Brand]), ModelModule],
  providers: [BrandService,],
  controllers: [BrandPublicController, BrandAdminController],
  exports: [BrandService],
})
export class BrandModule {}