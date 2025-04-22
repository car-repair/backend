import { Module } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { ServiceController } from "./service.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Service } from "./entities/service.entity";

@Module({
	controllers: [ServiceController],
	providers: [ServiceService],
	imports: [TypeOrmModule.forFeature([Service])],
	exports: [ServiceService]
})
export class ServiceModule {}
