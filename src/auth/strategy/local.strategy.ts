import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      usernameField: 'email', // Use 'email' as the username field
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);

    if (!user || !(await this.userService.validatePassword(user, password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}