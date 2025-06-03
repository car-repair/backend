import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { BookingModule } from '../booking/booking.module';
import { ServiceModule } from '../service/service.module';
import { AdminAuthModule } from './auth/admin-auth.module';
import { RouterModule, Routes } from '@nestjs/core';
import { CarModule } from '../car/car.module';

const adminRoutes: Routes = [
  {
    path: 'admin', 
    children: [
      {
        path: '',
        module: CarModule
      },
      {
        path: '',
        module: BookingModule
      }
    ]
  }
]

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [BookingModule, ServiceModule, AdminAuthModule, RouterModule.register(adminRoutes)],
  exports: [AdminAuthModule]
})
export class AdminModule { }
