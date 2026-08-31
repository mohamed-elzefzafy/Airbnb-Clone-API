import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import * as bcrypt from 'bcryptjs';
import { CreateUserUseCase } from './usecases/create-user.usecase';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}
  async create(createUserDto: CreateUserDto) {
return this.createUserUseCase.execute(createUserDto);
  }

  async findOne(query: QueryFilter<User>) {
  return this.userModel.findOne(query).exec();
  }
}
