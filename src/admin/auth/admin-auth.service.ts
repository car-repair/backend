import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export interface LoginDto {
    login: string;
    password: string;
}

@Injectable()
export class AdminAuthService {
    private readonly adminPassword: string;
    private readonly adminLogin: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {
        this.adminLogin = this.configService.get<string>('ADMIN_LOGIN')!;
        this.adminPassword = this.configService.get<string>('ADMIN_PASSWORD')!;
    }

    async login(dto: LoginDto): Promise<{ accessToken: string }> {
        const { login, password } = dto;

        if (password !== this.adminPassword || login !== this.adminLogin) {
            throw new UnauthorizedException('Неверное имя пользователя или пароль');
        }

        const payload = { role: 'admin', login: this.adminLogin };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken: accessToken };
    }

    async check(token: string): Promise<{ isAuthenticated: boolean }> {
        try {
            const payload = await this.jwtService.verifyAsync(token);
            if (payload.role === 'admin' && payload.login === this.adminLogin) {
                return { isAuthenticated: true };
            }
            throw new UnauthorizedException('Недействительный токен');
        } catch (error) {
            throw new UnauthorizedException('Недействительный или истёкший токен');
        }
    }
}