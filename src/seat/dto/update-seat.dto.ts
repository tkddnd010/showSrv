import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateSeatDto {
  @IsString()
  @IsNotEmpty({ message: '좌석 번호를 입력해주세요.' })
  seatNum: string;

  @IsString()
  @IsNotEmpty({ message: '좌석 등급을 입력해주세요.' })
  grade: string;

  @IsNumber()
  @IsNotEmpty({ message: '좌석 가격을 입력해주세요.' })
  price: number;
}
