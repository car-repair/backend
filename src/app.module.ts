import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ServiceModule } from "./service/service.module";
import { BookingModule } from "./booking/booking.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from './config/application.config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppConfig } from "./config/types";
import { DatabaseModule } from "./database/database.module";
import { AdminModule } from './admin/admin.module';
import { CarModule } from './car/car.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
	imports: [
		ServiceModule,
		BookingModule,
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
			envFilePath: '.env',
		}),
		DatabaseModule,
		AdminModule,
		CarModule,
		ScheduleModule,
		AdminModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
