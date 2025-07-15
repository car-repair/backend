import { Controller, Post, Body, HttpCode, HttpStatus, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService, LoginDto } from './admin-auth.service';

@Controller('admin/auth')
export class AdminAuthController {
    constructor(private readonly adminAuthService: AdminAuthService) { }

    @Post('')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto): Promise<{ accessToken: string }> {
        return this.adminAuthService.login(dto);
    }

    @Get('check')
    async check(@Headers('authorization') authHeader: string) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Токен не предоставлен или неверный формат');
        }

        const token = authHeader.replace('Bearer ', '');
        return this.adminAuthService.check(token);
    }
}