import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnviromentInterface } from 'src/common/configration/enviroment.interface';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { Model } from 'mongoose';
import { AuthResponseDto } from '../dtos/auth-response.dto';

@Injectable()
export class GenerateTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnviromentInterface>,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}
  async execute(userId: string): Promise<AuthResponseDto> {
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
