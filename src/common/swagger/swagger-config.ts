import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_TAGS } from './constant';

export class SwaggerConfig {
  static setUp(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('airbnb clone api')
      .setDescription('This is the apis for airbnb clone')
      .setVersion('1.0')
      .addTag(API_TAGS.AUTH)
      .addTag(API_TAGS.USERS)
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, documentFactory, {
      swaggerOptions: {
        filter: true,
        displayRequestDuration: true,
      },
    });
  }
}
