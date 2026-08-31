import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from './schemas/refresh-token.schema';
import { RefreshTokenDto } from './dtos/refreshToken.dto';
import { RegisterUseCase } from './usecases/register.usecase';
import { LoginUseCase } from './usecases/login.usecase';
import { GenerateTokenUseCase } from './usecases/generateToken.usecase';
import { RefreshTokenUseCase } from './usecases/refresh-token.usecase';
import { AuthResponseDto } from './dtos/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}
  async register(registerDto: RegisterDto) : Promise<AuthResponseDto> {
    return await this.registerUseCase.execute(registerDto);
  }


  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.loginUseCase.execute(loginDto);
  }
  refreshToken(refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(refreshTokenDto);
  }

  async generateToken(userId: string): Promise<AuthResponseDto> {
    return this.generateTokenUseCase.execute(userId);
  }
}
