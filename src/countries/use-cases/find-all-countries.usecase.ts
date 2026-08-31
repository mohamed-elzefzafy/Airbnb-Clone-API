import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from '../schemas/countries.schema';
import { Model } from 'mongoose';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindAllCountriesUsecase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(): Promise<CountryResponseDto[]> {
    const countries = await this.countryModel.find().exec();
  return countries.map(c => plainToInstance(CountryResponseDto,c.toObject()))
  }
}
