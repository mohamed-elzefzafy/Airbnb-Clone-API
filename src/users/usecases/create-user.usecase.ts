import { Injectable } from "@nestjs/common";
import { BadRequestException } from "src/common/error-handling/custom-exceptions/bad-request.exception";
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserResponseDto } from "../dtos/user-response.dto";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "../repository/user.repository";

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(createUserDto: CreateUserDto):Promise<UserResponseDto> {
        const exitigUserByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (exitigUserByEmail) {
      throw new BadRequestException('User with this email already exists');
    }

    const exitigUserByPhone = await this.userRepository.findOne({
      phoneNumber: createUserDto.phoneNumber,
    });
    if (exitigUserByPhone) {
      throw new BadRequestException('User with this phone already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

  const createdUser =  await this.userRepository.create({ ...createUserDto, password: hashedPassword });
  return plainToInstance(UserResponseDto,createdUser.toObject());
  }
}