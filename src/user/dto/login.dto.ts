import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto extends OmitType(CreateUserDto, ['name']) {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}
