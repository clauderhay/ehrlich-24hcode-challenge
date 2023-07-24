// src/auth/password-reset-token.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordResetToken } from '.././database/entities/PasswordResetTokenEntity';
import { User } from '.././database/entities/UserEntity';

@Injectable()
export class PasswordResetTokenService {
  constructor(
    @InjectRepository(PasswordResetToken)
    private readonly passwordResetTokenRepository: Repository<PasswordResetToken>,
  ) {}

  async createPasswordResetToken(user: User, token: string): Promise<void> {
    const passwordResetToken = new PasswordResetToken();
    passwordResetToken.token = token;
    passwordResetToken.user = user;
    await this.passwordResetTokenRepository.save(passwordResetToken);
  }

  async findTokenByToken(token: string): Promise<PasswordResetToken | undefined> {
    return this.passwordResetTokenRepository.findOneBy({ token });
  }

  async deletePasswordResetToken(userId: number, token: string): Promise<void> {
    await this.passwordResetTokenRepository.delete({ user: { id: userId }, token });
  }
}
