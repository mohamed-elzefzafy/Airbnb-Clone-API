import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CreateCountryUsecase } from './use-cases/create-country.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/countries.schema';
import { FindCountryByIdUsecase } from './use-cases/find-country-by-id.usecase';
import { FindAllCountriesUsecase } from './use-cases/find-all-countries.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],
  controllers: [CountriesController],
  providers: [CountriesService, CreateCountryUsecase,FindCountryByIdUsecase,FindAllCountriesUsecase],
})
export class CountriesModule {}
