import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { UsersController } from './users.controller';
import { ModelNames } from 'src/common/data-access/model-names.enum';
import { UserRepository } from './repository/user.repository';

@Module({
  providers: [UsersService, CreateUserUseCase,UserRepository],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: ModelNames.USERS, schema: UserSchema }]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
