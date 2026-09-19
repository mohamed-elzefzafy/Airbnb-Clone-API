import { Injectable } from '@nestjs/common';
import { Country } from '../schemas/countries.schema';
import { BaseRepository } from 'src/common/data-access/base-repository';
import { InjectModel } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access/model-names.enum';
import { Model } from 'mongoose';

@Injectable()
export class CountryRepository extends BaseRepository<Country> {
  constructor(
    @InjectModel(ModelNames.COUNTRY)
    private readonly countryModel: Model<Country>,
  ) {
    super(countryModel);
  }
}
