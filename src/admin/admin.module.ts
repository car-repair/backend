import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { BookingModule } from 'src/booking/booking.module';
import { ServiceModule } from 'src/service/service.module';
import { AdminAuthModule } from './auth/admin-auth.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [BookingModule, ServiceModule, AdminAuthModule],
  exports: [AdminAuthModule]
})
export class AdminModule { }
