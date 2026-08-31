import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from 'src/common/swagger/constant';

@ApiTags(API_TAGS.USERS)
@Controller('users')
export class UsersController {}
