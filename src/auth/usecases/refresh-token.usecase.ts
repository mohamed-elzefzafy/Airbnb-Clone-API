import { Injectable } from '@nestjs/common';
import { GenerateTokenUseCase } from './generateToken.usecase';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from '../dtos/refreshToken.dto';
import { ForbiddenException } from 'src/common/error-handling/custom-exceptions/forbidden.exception';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { Model } from 'mongoose';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly generateTokenUseCase: GenerateTokenUseCase,
    private readonly jwtService: JwtService,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}

  async execute(refreshTokenDto: RefreshTokenDto) {
    type refreshTokenPayload = {
      userId: string;
      type: string;
    };

    let decodedToken: refreshTokenPayload;
    try {
      decodedToken = await this.jwtService.verifyAsync<refreshTokenPayload>(
        refreshTokenDto.refreshToken,
      );
    } catch {
      return new ForbiddenException('Invalid refresh token');
    }

    if (!decodedToken || decodedToken.type !== 'refresh') {
      throw new BadRequestException('Invalid refresh token');
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

    return this.generateTokenUseCase.execute(refreshTokenDoc.userId);
  }
}
