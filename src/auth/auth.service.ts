// src/auth/auth.service.ts

import { Injectable, HttpStatus, HttpException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../auth/dto/login.dto';
import { UsersService } from '../users/users.service';
import { User } from '../database/entities/UserEntity';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as sendGrid from '@sendgrid/mail';
import { PasswordResetTokenService } from './password-reset-token.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import config from 'src/config';
import { Role } from './enum/roles.enum';

const { APP_URL } = config;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly passwordResetTokenService: PasswordResetTokenService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    // Validate the createUserDto manually
    const errors = await validate(createUserDto);

    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    // Check if the user already exists with the given email
    const existingUser = await this.usersService.findUserByEmail(email)
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create a new user entity
    const user = new User();
    user.email = email;
    
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    user.password = hashedPassword;

    // Save the user to the database
    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;

    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Generate and return a JWT token
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }

  async requestPasswordResetToken(email: string): Promise<string> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Generate a password reset token and sign it
    // Generate a password reset token and sign it
    const tokenPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role, // Assuming the user.roles field contains the user's roles
    };

    const token = this.jwtService.sign(tokenPayload, {
      expiresIn: '1h', // Set the token expiration time, it should match the signOptions in AppModule
    });

    // Send the token to the user's email
    try {
      const resetLink = `http://localhost:3000/password-reset/${token}`;
      await this.sendPasswordResetEmail(user.email, resetLink);
    } catch (error) {
      throw new HttpException('Failed to send email', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return token;
  }

  private async sendPasswordResetEmail(email: string, resetLink: string): Promise<void> {
    const msg = {
      to: email,
      from: 'claude.rhay@icloud.com',
      subject: 'Password Reset Request',
      text: `Click on the following link to reset your password: ${resetLink}`,
      html: `<p>Click on the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    };

    console.log(msg);

    try {
      await sendGrid.send(msg);
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response.body);
      }
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Validate the token and get the associated user ID
    const payload: JwtPayload = this.jwtService.verify(token, {
      secret: 'notSoSecretEhrlich'
    });

    // Find the user by ID
    const user = await this.usersService.findUserById(payload.sub);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await this.usersService.updateUser(user);

    // Delete the password reset token
    await this.passwordResetTokenService.deletePasswordResetToken(user.id, token);
  }
}
