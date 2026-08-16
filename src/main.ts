import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnviromentInterface } from './common/configration/enviroment.interface';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './common/error-handling/filters/custom-exception.filter';
import { i18nValidationErrorFactory, I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  // app.useGlobalFilters(new I18nValidationExceptionFilter({detailedErrors :false}));



  const configServive = app.get(ConfigService<EnviromentInterface>);
  const port = configServive.getOrThrow<number>('PORT');
  await app.listen(port);
  Logger.log(`Application is running on port : ${port}`);
}
bootstrap();
