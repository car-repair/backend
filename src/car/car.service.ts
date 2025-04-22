import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private repo: Repository<Car>
  ) { }
  async create(dto: CreateCarDto): Promise<Car> {
    return this.repo.create(dto)
  }

  async findAll(): Promise<Car[]> {
    return this.repo.find()
  }

  async findOne(id: string): Promise<Car | null> {
    const found = await this.repo.findOneBy({ id });
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
