import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnviromentInterface } from './common/configration/enviroment.interface';
import { ConsoleLogger, Logger } from '@nestjs/common';
import { I18nValidationPipe } from 'nestjs-i18n';
import { SwaggerConfig } from './common/swagger/swagger-config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger :new ConsoleLogger({json:process.env.NODE_ENV === "production"}),
  });

  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  // app.useGlobalFilters(new I18nValidationExceptionFilter({detailedErrors :false}));
  SwaggerConfig.setUp(app);

  const configServive = app.get(ConfigService<EnviromentInterface>);
  const port = configServive.getOrThrow<number>('PORT');
  await app.listen(port);
  Logger.log(`Application is running on port : ${port}`);
}
bootstrap();
