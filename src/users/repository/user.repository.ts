import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { ModelNames } from 'src/common/data-access/model-names.enum';
import { BaseRepository } from 'src/common/data-access/base-repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(ModelNames.USERS)
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }
}
