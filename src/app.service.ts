import { Injectable } from '@nestjs/common';
import { EnviromentInterface } from './common/configration/enviroment.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService<EnviromentInterface>,
  ) {}
  getHello(): string {
    console.log(this.configService.getOrThrow('PORT'));

    return 'Hello World!';
  }
}
