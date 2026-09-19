import { Injectable } from '@nestjs/common';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class SoftDeleteCountryUsecase {
  constructor(private readonly countryRepository: CountryRepository) {}
  async execute(id: string): Promise<void> {
    const country = await this.countryRepository
      .findOne({ _id: id, isDeleted: false });
    if (!country) {
      throw new BadRequestException('country not exist');
    }
    country.isDeleted = true;
    country.deletedAt = new Date();
    await country.save();
  }
}
