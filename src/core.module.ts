import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envSchema } from './common/configration/env-schema.validation';
import configMapping from './common/configration/config-mapping';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { EnviromentInterface } from './common/configration/enviroment.interface';
import * as path from 'node:path';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
        ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
      load: [configMapping],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<EnviromentInterface>) => ({
        fallbackLanguage: configService.getOrThrow<string>('FULLBACK_LANGUAGE'),
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true,
        },
      }),

      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService<EnviromentInterface>) => ({
    uri: configService.getOrThrow<string>('mongodbUri'),

    }),
    inject: [ConfigService],
      })
  ],
})
export class CoreModule {}
