import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsernameEmail(username);

    if (!user) return 'User not found';

    const comparedPassword = bcrypt.compare(password, user.password);
    if (!comparedPassword) return 'Password mismatch';

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByUsernameEmail(loginDto.username);

    if (!user) return 'User not found';

    const comparedPassword = bcrypt.compare(loginDto.password, user.password);
    if (!comparedPassword) return 'Password mismatch';

    const payload = { username: loginDto.username, sub: user.id };
    return {
      statuCode: HttpStatus.OK,
      access_token: this.jwtService.sign(payload, { expiresIn: '24h' }),
    };
  }
}
