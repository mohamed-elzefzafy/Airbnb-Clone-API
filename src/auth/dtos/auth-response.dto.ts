import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'accessToken',
    example: 'cddfedtfgtrrrrrrrrrrrrrrrrrrrrrr',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'refreshToken',
    example: 'sadasdsssssssssssfrreeeeeeeeeeee',
  })
  refreshToken!: string;
}
