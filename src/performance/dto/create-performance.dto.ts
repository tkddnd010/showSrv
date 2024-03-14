import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../types/category.type';

export class CreatePerformanceDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '공연 설명을 입력해주세요.' })
  content: string;

  @IsArray()
  @IsNotEmpty({ message: '공연 일정을 입력해주세요.' })
  schedule: string[];

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  place: string;

  @IsString()
  @IsNotEmpty({ message: '공연 정보를 입력해주세요.' })
  pfmInfo: string;

  @IsString()
  @IsNotEmpty({ message: '공연 이미지를 입력해주세요.' })
  image: string;

  @IsEnum(Category)
  @IsNotEmpty({ message: '공연 카테고리 입력해주세요.' })
  category: Category;
}
