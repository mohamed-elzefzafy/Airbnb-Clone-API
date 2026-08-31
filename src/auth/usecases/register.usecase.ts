import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { UsersService } from 'src/users/users.service';
import { GenerateTokenUseCase } from './generateToken.usecase';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
  ) {}

  async execute(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const createdUser = await this.usersService.create(registerDto);
    const { accessToken, refreshToken } =
      await this.generateTokenUseCase.execute(createdUser._id.toString());
    return plainToInstance(AuthResponseDto, { accessToken, refreshToken });
  }
}
