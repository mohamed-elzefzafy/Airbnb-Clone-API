import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from '../schemas/countries.schema';
import { Model } from 'mongoose';
import { CreateCountryDto } from '../dtos/createCountry.dto';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';
import { ModelNames } from 'src/common/data-access/model-names.enum';
import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class CreateCountryUsecase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(
    createCountryDto: CreateCountryDto,
  ): Promise<CountryResponseDto> {
    const exitingCountry = await this.countryRepository.findOne({
      name: createCountryDto.name,
      isDeleted: false,
    });
    if (exitingCountry) {
      throw new BadRequestException('country name already exist');
    }
    const country = await this.countryRepository.findOne({
      name: createCountryDto.name,
      isDeleted: true,
    });
    if (country) {
      country.isDeleted = false;
      country.deletedAt = null;
      await country.save();
      return plainToInstance(CountryResponseDto, country.toObject());
    }

    const createdCountry = await this.countryRepository.create(createCountryDto);
    return plainToInstance(CountryResponseDto, createdCountry.toObject());
  }
}
