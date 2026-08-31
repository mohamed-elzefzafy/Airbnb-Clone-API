import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from '../schemas/countries.schema';
import { Model } from 'mongoose';
import { CreateCountryDto } from '../dtos/createCountry.dto';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateCountryUsecase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(
    createCountryDto: CreateCountryDto,
  ): Promise<CountryResponseDto> {
    const exitingCountry = await this.countryModel.findOne({
      name: createCountryDto.name,
    });
    if (exitingCountry) {
      throw new BadRequestException('country name already exist');
    }
    const createdCountry = await this.countryModel.create(createCountryDto);
    return plainToInstance(CountryResponseDto, createdCountry.toObject());
  }
}
