import { Injectable } from '@nestjs/common';
import {  QueryFilter } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
  private readonly userRepository: UserRepository,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}
  async create(createUserDto: CreateUserDto) {
return this.createUserUseCase.execute(createUserDto);
  }

  async findOne(query: QueryFilter<User>) {
  return this.userRepository.findOne(query);
  }
}
