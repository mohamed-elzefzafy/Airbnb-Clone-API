import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { GenerateTokenUseCase } from './generateToken.usecase';
import { LoginDto } from '../dtos/login.dto';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcryptjs';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
    private readonly i18nService: I18nService,
  ) {}

  async execute(loginDto: LoginDto) : Promise<AuthResponseDto> {
    const user = await this.usersService.findOne({ email: loginDto.email });
    if (!user) {
      throw new BadRequestException(
        this.i18nService.translate('auth.INVALID_CREDENTIALS'),
      );
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException(
        this.i18nService.translate('auth.INVALID_CREDENTIALS'),
      );
    }

    const { accessToken, refreshToken } = await this.generateTokenUseCase.execute(user._id.toString());
    return plainToInstance(AuthResponseDto , { accessToken, refreshToken })
  }
}
