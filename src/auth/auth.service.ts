import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import * as bcrypt from 'bcryptjs';
import { I18nService } from 'nestjs-i18n';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from './schemas/refresh-token.schema';
import { Model } from 'mongoose';
import { after } from 'node:test';
import { ConfigService } from '@nestjs/config';
import { EnviromentInterface } from 'src/common/configration/enviroment.interface';
import { RefreshTokenDto } from './dtos/refreshToken.dto';
import { ForbiddenException } from 'src/common/error-handling/custom-exceptions/forbidden.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly i18nService: I18nService,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly configService: ConfigService<EnviromentInterface>,
  ) {}
  async register(registerDto: RegisterDto) {
    const createdUser = await this.usersService.create(registerDto);
    const tokens = this.generateToken(createdUser._id.toString());
    return tokens;
  }

  async login(loginDto: LoginDto) {
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

    return this.generateToken(user._id.toString());
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    type refreshTokenPayload = {
      userId: string;
      type: string;
    };

    let decodedToken: refreshTokenPayload;
    try {
       decodedToken =
        await this.jwtService.verifyAsync<refreshTokenPayload>(
          refreshTokenDto.refreshToken,
        );

      if (!decodedToken || decodedToken.type !== 'refresh') {
        throw new BadRequestException('Invalid refresh token');
      }
    
    } catch {
      return new ForbiddenException('Invalid refresh token');
    }

    const refreshTokenDoc = await this.refreshTokenModel.findOne({
      userId: decodedToken.userId,
    });
    if (!refreshTokenDoc) {
      throw new ForbiddenException('Invalid refresh token');
    }

    const isRefreshTokenMatched = await bcrypt.compare(
      refreshTokenDto.refreshToken,
      refreshTokenDoc.refreshToken,
    );
    if (!isRefreshTokenMatched) {
      throw new ForbiddenException('Invalid refresh token');
    }

    return this.generateToken(refreshTokenDoc.userId);
  }

  async generateToken(userId: string) {
    const accessToken = await this.jwtService.signAsync({ userId });
    const refreshToken = await this.jwtService.signAsync(
      { userId, type: 'refresh' },
      { expiresIn: this.configService.getOrThrow('REFRESH_TOKEN_EXPIRE_IN') },
    );
    //update refresh token in database if it's not exist create it
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.refreshTokenModel.findOneAndUpdate(
      { userId },
      { refreshToken: hashedRefreshToken },
      { upsert: true, returnDocument: 'after' },
    );
    return { accessToken, refreshToken };
  }
}
