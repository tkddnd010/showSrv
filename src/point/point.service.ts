import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
  ) {}

  create(user_id: number) {
    this.pointRepository.save({ user_id });
  }

  async update(user_id: number, balance: number) {
    const userPoint = await this.pointRepository.findOne({
      where: { user_id },
    });
    userPoint.balance = balance;

    this.pointRepository.save(userPoint);
  }

  async findUser(user_id: number) {
    return await this.pointRepository.findOne({
      where: { user_id },
    });
  }
}
