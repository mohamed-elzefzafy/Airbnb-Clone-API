import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const exitigUserByEmail = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (exitigUserByEmail) {
      throw new BadRequestException('User with this email already exists');
    }

    const exitigUserByPhone = await this.userModel.findOne({
      phoneNumber: createUserDto.phoneNumber,
    });
    if (exitigUserByPhone) {
      throw new BadRequestException('User with this phone already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

  return  await this.userModel.create({ ...createUserDto, password: hashedPassword });
  }

  async findOne(query: QueryFilter<User>) {
  return this.userModel.findOne(query).exec();
  }
}
