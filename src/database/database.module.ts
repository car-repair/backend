import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from '../config/types';
import { Service } from '../service/entities/service.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService<AppConfig, true>) => {
                const typeormConfig = configService.get('typeorm');
                return {
                    ...typeormConfig,
                    entities: [Service],
                    autoLoadEntities: true,
                };
            },
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}