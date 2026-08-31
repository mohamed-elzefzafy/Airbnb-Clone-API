import { Injectable } from "@nestjs/common";
import { BadRequestException } from "src/common/error-handling/custom-exceptions/bad-request.exception";
import * as bcrypt from 'bcryptjs';
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserResponseDto } from "../dtos/user-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class CreateUserUseCase {
  constructor(  @InjectModel(User.name) private readonly userModel: Model<User>,) {}
  async execute(createUserDto: CreateUserDto):Promise<UserResponseDto> {
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

  const createdUser =  await this.userModel.create({ ...createUserDto, password: hashedPassword });
  return plainToInstance(UserResponseDto,createdUser.toObject());
  }
}