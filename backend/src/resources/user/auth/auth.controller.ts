import { Body, Controller, Post } from '@nestjs/common';
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
}
