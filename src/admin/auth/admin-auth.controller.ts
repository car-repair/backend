import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AdminAuthService, LoginDto } from './admin-auth.service';

@Controller('admin/auth')
export class AdminAuthController {
    constructor(private readonly adminAuthService: AdminAuthService) { }

    @Post('')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto): Promise<{ accessToken: string }> {
        return this.adminAuthService.login(dto);
    }
}