import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllDto {
  @ApiPropertyOptional({
    description: 'Filter by country name',
    example: 'Egypt',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Filter by country code', example: 'EG' })
  @IsOptional()
  @IsString()
  countryCode?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  ignoreLimit?: boolean;
}
