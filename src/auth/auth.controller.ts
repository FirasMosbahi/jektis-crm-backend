import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, SignUpDto } from '../dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto);
    return {
      data,
      message: 'agent logged in successfully',
    };
  }

  @Post('/signup')
  async signup(@Body() signupDto: SignUpDto) {
    const data = await this.authService.signup(signupDto);
    return {
      data,
      message: 'agent created successfully',
    };
  }
}
