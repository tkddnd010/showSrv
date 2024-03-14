import { Injectable } from '@nestjs/common';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Performance } from './entities/performance.entity';
import { SearchDto } from './dto/search-performance.dto';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>,
  ) {}

  async create(createPerformanceDto: CreatePerformanceDto) {
    const { title, content, schedule, place, pfmInfo, image, category } =
      createPerformanceDto;

    await this.performanceRepository.save({
      title,
      content,
      schedule,
      place,
      pfmInfo,
      image,
      category,
    });
  }

  async update(performance_id: number) {
    const performance = await this.findOne(performance_id);
    performance.status = false;
    await this.performanceRepository.save(performance);
  }

  async findAll(): Promise<Performance[]> {
    return await this.performanceRepository.find({
      select: ['id', 'title', 'place', 'schedule', 'image'],
    });
  }

  searchPerformance(searchDto: SearchDto): Promise<Performance[]> {
    const { title } = searchDto;

    return this.performanceRepository.find({
      where: { title: Like(`%${title}%`) },
      select: ['id', 'title', 'place', 'schedule', 'image'],
    });
  }

  findOne(id: number) {
    return this.performanceRepository.findOneBy({ id });
  }
}
