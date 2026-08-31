import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refreshToken.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignupSwagger } from './swagger/register.swagger';
import { LoginSwagger } from './swagger/login.swagger';
import { RefreshTokenSwagger } from './swagger/refresh-token.swagger';
import { API_TAGS } from 'src/common/swagger/constant';

@ApiTags(API_TAGS.AUTH)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}
  private readonly logger = new Logger(AuthController.name);
  @SignupSwagger()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @LoginSwagger()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    this.logger.log("from login method")
    return this.authService.login(loginDto);
  }

  @RefreshTokenSwagger()
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
