import { Module } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { ServicePublicController } from "./service.public.controller";
import { ServiceAdminController } from "./service.admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Service } from "./entities/service.entity";

@Module({
	controllers: [ServicePublicController, ServiceAdminController],
	providers: [ServiceService],
	imports: [TypeOrmModule.forFeature([Service])],
	exports: [ServiceService]
})
export class ServiceModule {}
