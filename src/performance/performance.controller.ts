import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { PerformanceService } from './performance.service';
import { SearchDto } from './dto/search-performance.dto';

@UseGuards(RolesGuard)
@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() createPerformanceDto: CreatePerformanceDto) {
    return await this.performanceService.create(createPerformanceDto);
  }

  @Get()
  findAll() {
    return this.performanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.performanceService.findOne(+id);
  }

  @Post('search')
  searchPerformance(@Body() searchDto: SearchDto) {
    return this.performanceService.searchPerformance(searchDto);
  }
}
