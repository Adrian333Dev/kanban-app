import { Body, Controller, Get, Post } from '@nestjs/common';
import { IRequestUser, User } from 'src/shared/decorators/user.decorator';
import { SigninDto, SignupDto } from '../dto/auth.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.auth.signup(body);
  }

  @Post('signin')
  signin(@Body() body: SigninDto) {
    return this.auth.signin(body);
  }

  @Get('me')
  me(@User() user: IRequestUser) {
    return user;
  }
}
