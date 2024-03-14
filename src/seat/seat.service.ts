import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { parse } from 'papaparse';
import _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}

  async create(file: Express.Multer.File, performance_id: number) {
    if (!file.originalname.endsWith('.csv')) {
      throw new BadRequestException('CSV 파일만 업로드 가능합니다.');
    }

    const csvContent = file.buffer.toString();

    let parseResult;

    try {
      parseResult = parse(csvContent, {
        header: true,
        skipEmptyLines: true,
      });
    } catch (err) {
      throw new BadRequestException('CSV 파싱에 실패했습니다.');
    }

    const seatsData = parseResult.data as any[];

    for (const seatData of seatsData) {
      if (
        _.isNil(seatData.seatNum) &&
        _.isNil(seatData.grade) &&
        _.isNil(seatData.price)
      ) {
        throw new BadRequestException(
          'CSV 파일은 좌석번호와 좌석등급과 좌석가격 컬럼을 포함해야 합니다',
        );
      }
    }

    const createSeatDto = seatsData.map((seatData) => ({
      seatNum: seatData.seatNum,
      grade: seatData.grade,
      price: +seatData.price,
      performance_id: +performance_id,
    }));

    await this.seatRepository.save(createSeatDto);
  }

  async update(performance_id: number, seat_id: number) {
    const seat = await this.seatRepository.findOne({
      where: { seatNum: seat_id, performance_id },
    });
    if (_.isNil(seat)) {
      throw new NotFoundException('존재하지 않는 좌석입니다.');
    }

    if (seat.status === false) {
      throw new BadRequestException('이미 예약된 좌석입니다.');
    }

    seat.status = false;
    await this.seatRepository.save(seat);
  }

  async findAll(performance_id: number): Promise<Seat[]> {
    return await this.seatRepository.find({
      where: { status: true, performance_id },
      select: ['seatNum', 'grade', 'price'],
    });
  }

  async findOne(performance_id: number, seat_id: number) {
    return this.seatRepository.findOne({
      where: { seatNum: seat_id, performance_id },
    });
  }

  async getSeatCount(performance_id: number) {
    const count = await this.seatRepository.count({
      where: { performance_id },
    });
    return count;
  }
}
