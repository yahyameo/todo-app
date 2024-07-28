import { HttpCode, HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async register(username: string, password: string) {
    const userExistAlready = await this.userModel.findOne({ username: username });
    if (userExistAlready) {
      throw new HttpException('Username already exist', HttpStatus.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await (new this.userModel({ username, password: hashedPassword })).save();
    return true;
  }

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const payload = { username: user.username, id: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
