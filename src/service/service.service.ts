import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { Service } from "./entities/service.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ServiceService {
	constructor (
		@InjectRepository(Service)
    	private repo: Repository<Service>,
	) { }
	async create(dto: CreateServiceDto): Promise<Service>  {
		const entity = new Service(dto);
		return this.repo.save(entity)
	}

	async findAll(): Promise<Service[]> {
		return this.repo.find();
	}

	async findOne(id: string): Promise<Service | null> {
		const found = this.repo.findOneBy({id: id})
		if (!found) throw new NotFoundException(`Service with id ${id} not found`)
		return found;
	}

	async update(id: string, dto: UpdateServiceDto): Promise<Service> {
		const existed = await this.findOne(id);
		const updated = { ...existed, ...dto };
		return this.repo.save(updated);
	}

	async remove(id: string): Promise<void> {
		await this.repo.softRemove({id: id})
	}
}
