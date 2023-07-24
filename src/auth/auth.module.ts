import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { dataSourceOptions } from '../data-source';
import { JwtModule } from '@nestjs/jwt';
import config  from '../config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordResetTokenService } from './password-reset-token.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { PasswordResetToken } from 'src/database/entities/PasswordResetTokenEntity';
import { User } from 'src/database/entities/UserEntity';

const { JWT_SECRET } = config;


@Module({
  imports: [
      TypeOrmModule.forRoot(dataSourceOptions),
      TypeOrmModule.forFeature([PasswordResetToken, User]),
      UsersModule,
      JwtModule.register({
        secret: JWT_SECRET,
        signOptions: { expiresIn: '1h' }, // Customize the token expiration time
      }),
      PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
      LocalStrategy, 
      PasswordResetTokenService, 
      JwtStrategy, 
      UsersService, 
      ConfigService,
      AuthService,
    ], 
  controllers: [AuthController],
  exports: [PassportModule, JwtModule, TypeOrmModule],
})
export class AuthModule {}
