import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private repo: Repository<Brand>,
  ) {}

  async create(name: string): Promise<Brand> {
    const brand = this.repo.create({ name });
    return this.repo.save(brand);
  }

  async findAll(): Promise<Brand[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Brand | null> {
    const found = await this.repo.findOneBy({ id });
    if (!found) throw new NotFoundException(`Brand with id ${id} not found`);
    return found;
  }

  async update(id: string, name: string): Promise<Brand | null> {
    const existed = await this.findOne(id);
    const updated = { ...existed, name };
    return this.repo.save(updated);
  }

  async remove(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}