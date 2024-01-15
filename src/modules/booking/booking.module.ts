import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './entities/booking.entity';
import { BookingMenuEntity } from './entities/bookingMenu.entity';
import { UserModule } from '../user/user.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity, BookingMenuEntity]),
    UserModule,
    ScheduleModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
