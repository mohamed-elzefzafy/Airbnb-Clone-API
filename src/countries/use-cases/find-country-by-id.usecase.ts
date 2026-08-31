import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from '../schemas/countries.schema';
import { Model } from 'mongoose';
import { CreateCountryDto } from '../dtos/createCountry.dto';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindCountryByIdUsecase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(
    id: string,
  ): Promise<CountryResponseDto> {
    const country = await this.countryModel.findById(id);
    if (!country) {
      throw new BadRequestException('country not exist');
    }
    return plainToInstance(CountryResponseDto, country.toObject());
  }
}
