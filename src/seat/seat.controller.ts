import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Param,
  Get,
} from '@nestjs/common';
import { SeatService } from './seat.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/types/userRole.type';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(RolesGuard)
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Roles(Role.Admin)
  @Post(':performance_id')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Param('performance_id') performance_id: number,
  ) {
    await this.seatService.create(file, +performance_id);
  }

  @Get(':performance_id')
  async findAll(@Param('performance_id') performance_id: number) {
    return await this.seatService.findAll(+performance_id);
  }
}
