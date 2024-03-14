import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { SeatModule } from 'src/seat/seat.module';
import { PointModule } from 'src/point/point.module';
import { PerformanceModule } from 'src/performance/performance.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    SeatModule,
    PointModule,
    PerformanceModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
