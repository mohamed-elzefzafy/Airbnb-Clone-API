import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dtos/createCountry.dto';
import { CountryResponseDto } from './dtos/country-response.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { FindCountryByIdDto } from './dtos/find-country-by-id.dto';
import { CountryIdDto } from './dtos/country-id.dto';
import { STATUS_CODES } from 'http';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { PaginatedResult } from 'src/common/data-access/base-repository';

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
  async getCountryById(
    @Param() param: FindCountryByIdDto,
  ): Promise<CountryResponseDto> {
    return this.countriesService.getCountryById(param.id);
  }

  @Get()
  async findAll(@Query() query: FindAllDto):  Promise<PaginatedResult<CountryResponseDto>> {
    return this.countriesService.findAll(query);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param() param: CountryIdDto): Promise<void> {
    return this.countriesService.deleteById(param.id);
  }

  @Patch(':id')
  async updateCountry(
    @Param() param: CountryIdDto,
    @Body() updateCountryDto: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.countriesService.updateCountry(param.id, updateCountryDto);
  }
}
