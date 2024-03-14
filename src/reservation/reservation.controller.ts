import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post(':performance_id/:seat_id')
  create(
    @UserInfo() user: User,
    @Param('performance_id') performance_id: number,
    @Param('seat_id') seat_id: number,
  ) {
    return this.reservationService.create(user.id, +performance_id, +seat_id);
  }

  @Get()
  findAll(@UserInfo() user: User) {
    return this.reservationService.findAll(+user.id);
  }
}
