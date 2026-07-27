import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnviromentInterface } from './common/configration/enviroment.interface';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configServive = app.get(ConfigService<EnviromentInterface>);
  const port = configServive.getOrThrow<number>('PORT');
  await app.listen(port);
  Logger.log(`Application is running on port : ${port}`);
}
bootstrap();
