import { Controller, Request, Post, UseGuards, HttpStatus, HttpException, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from '../auth/dto/login.dto';
import { AuthService } from './auth.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PasswordResetTokenDto } from './dto/password-reset-token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ description: 'User registered successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input. Please check your email and password.' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User registered successfully',
        data: user,
      };
    } catch (error) {

      if (error instanceof HttpException && error.getStatus() === HttpStatus.BAD_REQUEST) {
        throw new HttpException(error.getResponse(), HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'Logins a Registered User' })
  @ApiCreatedResponse({ description: 'Login Successful!' })
  @ApiBadRequestResponse({ description: 'Invalid input. Please check your email and password.' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return { access_token: token };
  }

  @ApiOperation({ summary: 'Request for Password Reset' })
  @ApiCreatedResponse({ description: 'Password Reset Token Sent to your email.' })
  @ApiBadRequestResponse({ description: 'Invalid input. Please check your email and password.' })
  @Post('request-password-reset')
  async requestPasswordReset(@Body() passwordResetDto: PasswordResetTokenDto): Promise<any> {
    try {
      const token = await this.authService.requestPasswordResetToken(passwordResetDto.email);
      return { message: 'Password reset email sent', resetToken: token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Resets user`s Password.' })
  @ApiCreatedResponse({ description: 'Password changed successfully!' })
  @ApiBadRequestResponse({ description: 'Invalid input.' })
  @Post('reset-password/:token')
  async resetPassword(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDto): Promise<any> {
    try {
      await this.authService.resetPassword(token, resetPasswordDto.newpassword);
      return { message: 'Password reset successful' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
