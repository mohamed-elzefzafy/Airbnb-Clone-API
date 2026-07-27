import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './common/configration/env-schema.validation';
import { defaultEnv } from './common/configration/enviroment-modes/default.env';
import configMapping from './common/configration/config-mapping';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: envSchema ,load:[configMapping]}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
