import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CreateUserDetailDto {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  avatar: any;

  @ApiPropertyOptional()
  fullname?: string;

  @ApiPropertyOptional()
  gender?: string;

  @ApiPropertyOptional()
  birthdayDate?: string;

  @ApiPropertyOptional()
  horoscope?: string;

  @ApiPropertyOptional()
  zodiac?: string;

  @ApiPropertyOptional()
  height: number;

  @ApiPropertyOptional()
  weight?: number;

  @ApiPropertyOptional()
  interests?: Array<string> = [];
}
