import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnviromentInterface } from 'src/common/configration/enviroment.interface';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schemas/refresh-token.schema';
import { RegisterUseCase } from './usecases/register.usecase';
import { GenerateTokenUseCase } from './usecases/generateToken.usecase';
import { LoginUseCase } from './usecases/login.usecase';
import { RefreshTokenUseCase } from './usecases/refresh-token.usecase';
import { ModelNames } from 'src/common/data-access/model-names.enum';
import { RefreshTokenRepository } from './repository/refresh-token.repository';

@Module({
  providers: [
    AuthService,
    RegisterUseCase,
    GenerateTokenUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    RefreshTokenRepository
  ],
  controllers: [AuthController],
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: ModelNames.REFRESH_TOKENS, schema: RefreshTokenSchema },
    ]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService<EnviromentInterface>) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: configService.getOrThrow('JWT_EXPIRE_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
