import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dtos/createCountry.dto';
import { CountryResponseDto } from './dtos/country-response.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { FindCountryByIdDto } from './dtos/find-country-by-id.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  async create(
    @Body() createCountryDto: CreateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.countriesService.create(createCountryDto);
  }

  @Get(':id')
  async getCountryById(@Param() param: FindCountryByIdDto):Promise<CountryResponseDto> {
return this.countriesService.getCountryById(param.id);
  }

  @Get()
  async findAll(){
    return this.countriesService.findAll();
  }
}
