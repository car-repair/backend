import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from './entities/model.entity';
import { Brand } from '../brand/entities/brand.entity'; // Обновляем путь

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private modelRepo: Repository<Model>,
    @InjectRepository(Brand)
    private brandRepo: Repository<Brand>,
  ) {}

  async create(name: string, brandId: string): Promise<Model> {
    const brand = await this.brandRepo.findOneBy({ id: brandId });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    const model = this.modelRepo.create({ name, brand });
    return this.modelRepo.save(model);
  }

  async findAll(): Promise<Model[]> {
    return this.modelRepo.find({ relations: ['brand'] });
  }

  async findByBrand(brandId: string): Promise<Model[]> {
    return this.modelRepo.find({ where: { brand: { id: brandId } }, relations: ['brand'] });
  }

  async findOne(id: string): Promise<Model | null> {
    const found = await this.modelRepo.findOne({ where: { id }, relations: ['brand'] });
    if (!found) throw new NotFoundException(`Brand with id ${id} not found`);
    return found;
  }

  async update(id: string, name: string, brandId: string): Promise<Model> {
    const existed = await this.findOne(id);
    const updated = { ...existed, name, brandId };
    return this.modelRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    await this.modelRepo.softDelete(id);
  }
}