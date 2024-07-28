import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomMessage } from 'src/utils/custom-message.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @CustomMessage('User created successfully')
  async register(@Body() body: { username: string; password: string }) {
    return await this.authService.register(body.username, body.password);
  }

  @Post('login')
  @CustomMessage('User logged in successfully')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }
}
