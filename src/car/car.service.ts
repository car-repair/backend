import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { Model } from './model/entities/model.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private repo: Repository<Car>,
    @InjectRepository(Model)
    private modelRepo: Repository<Model>
  ) { }
  async create(dto: CreateCarDto): Promise<Car> {
    const { modelId, brandId } = dto;
    const model = await this.modelRepo.findOne({
      where: { id: modelId },
      relations: ['brand'],
    });
    if (!model || model.id !== modelId || model.brand.id !== brandId) {
      throw new BadRequestException(`Wrong modelId ${modelId} or brandId ${brandId}`);
    }
    const entity = new Car(dto)
    entity.brand = model.brand;
    entity.model = model;
    return this.repo.save(entity)
  }

  async findAll(): Promise<Car[]> {
    return this.repo.find(
      { relations: ['brand', 'model'], }
    )
  }

  async findOne(id: string): Promise<Car | null> {
    const found = await this.repo.findOne({
      where: { id: id },
      relations: ['brand', 'model'],
    });
    if (!found) throw new NotFoundException(`Car with id ${id} not found`);
    return found;
  }

  async update(id: string, dto: UpdateCarDto): Promise<Car> {
    const existed = await this.findOne(id);
    const updated = { ...existed, ...dto };
    return this.repo.save(updated);
  }

  remove(id: string) {
    return `This action removes a #${id} car`;
  }
}
