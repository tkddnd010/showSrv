import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { SeatService } from 'src/seat/seat.service';
import _ from 'lodash';
import { PointService } from 'src/point/point.service';
import { PerformanceService } from 'src/performance/performance.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly seatService: SeatService,
    private readonly pointService: PointService,
    private readonly performanceService: PerformanceService,
  ) {}

  async create(user_id: number, performance_id: number, seat_id: number) {
    const userPoint = await this.pointService.findUser(user_id);
    const seatPrice = await this.seatService.findOne(performance_id, seat_id);
    if (userPoint.balance < seatPrice.price) {
      throw new BadRequestException('보유 잔액이 부족합니다.');
    }

    let balance: number = userPoint.balance - seatPrice.price;

    const performancestatus =
      await this.performanceService.findOne(performance_id);

    if (performancestatus.status === false) {
      throw new BadRequestException('공연의 좌석이 이미 매진되었습니다.');
    }

    const reservation = await this.reservationRepository.findOne({
      where: { user_id, performance_id, seat_id },
    });
    if (reservation) {
      throw new NotFoundException('이미 예약된 좌석입니다.');
    }

    await this.reservationRepository.save({
      user_id,
      performance_id,
      seat_id,
    });
    this.seatService.update(performance_id, seat_id);
    this.pointService.update(user_id, balance);
    const [rsvCount, seatCount] = await this.getCount(performance_id);
    console.log(rsvCount, seatCount);
    if (rsvCount === seatCount) {
      await this.performanceService.update(performance_id);
    }
  }

  findAll(user_id: number) {
    return this.reservationRepository.find({
      where: { user_id },
      order: { createdAt: 'DESC' },
    });
  }

  async getCount(performance_id: number): Promise<number[]> {
    let count: number[] = [];
    const rsvCount = await this.reservationRepository.count({
      where: { performance_id },
    });
    count.push(rsvCount);

    const seatCount = await this.seatService.getSeatCount(performance_id);
    count.push(seatCount);
    return count;
  }
}
