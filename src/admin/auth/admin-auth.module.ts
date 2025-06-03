import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAdminStrategy } from './jwt.admin.strategy';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '72h' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AdminAuthService, JwtAdminStrategy],
    controllers: [AdminAuthController],
})
export class AdminAuthModule { }