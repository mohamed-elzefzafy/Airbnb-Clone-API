import { Injectable } from '@nestjs/common';
import { CreateCountryUsecase } from './use-cases/create-country.usecase';
import { CreateCountryDto } from './dtos/createCountry.dto';
import { CountryResponseDto } from './dtos/country-response.dto';
import { FindCountryByIdUsecase } from './use-cases/find-country-by-id.usecase';
import { FindAllCountriesUsecase } from './use-cases/find-all-countries.usecase';

@Injectable()
export class CountriesService {
  constructor(
    private readonly createCountryUsecase: CreateCountryUsecase,
    private readonly findCountryByIdUsecase: FindCountryByIdUsecase,
    private readonly findAllCountriesUsecase: FindAllCountriesUsecase,
  ) {}

  async create(
    createCountryDto: CreateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.createCountryUsecase.execute(createCountryDto);
  }

  getCountryById(
    id: string,
  ): CountryResponseDto | PromiseLike<CountryResponseDto> {
  return this.findCountryByIdUsecase.execute(id)
  }

async findAll(){
return this.findAllCountriesUsecase.execute();
  }
}
