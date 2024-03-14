import { PickType } from '@nestjs/mapped-types';
import { CreatePerformanceDto } from './create-performance.dto';

export class SearchDto extends PickType(CreatePerformanceDto, ['title']) {}
