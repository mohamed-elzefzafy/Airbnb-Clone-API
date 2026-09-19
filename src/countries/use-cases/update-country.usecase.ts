import { Injectable } from '@nestjs/common';
import { UpdateCountryDto } from '../dtos/update-country.dto';
import { plainToInstance } from 'class-transformer';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { NotFoundException } from 'src/common/error-handling/custom-exceptions/not-found.exception';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class UpdateCountryUsecase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(
    countryId: string,
    updateCountryDto: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    const country = await this.countryRepository.findOne({
      _id: countryId,
      isDeleted: false,
    });
    if (!country) {
      throw new NotFoundException('Country not found');
    }

    if (updateCountryDto.name) {
      const existingCountry = await this.countryRepository.findOne({
        name: updateCountryDto.name,
        isDeleted: false,
        _id: { $ne: countryId },
      });
      if (existingCountry)
        throw new BadRequestException('Country name already exists');
    }

    const updatedCountry = await this.countryRepository.findByIdAndUpdate(
      countryId,
      updateCountryDto,
      { returnDocument: 'after' },
    );
    return plainToInstance(CountryResponseDto, updatedCountry?.toObject());
  }
}
