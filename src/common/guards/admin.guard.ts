import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminJWTGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    if (!user || user.role !== 'admin') {
      throw new UnauthorizedException('Access denied');
    }
    return user;
  }
}
