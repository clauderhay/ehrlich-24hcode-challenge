import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from 'src/database/entities/UserEntity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Import the TypeORM repository for the User entity
  controllers: [UsersController], // Register the UsersController as a controller
  providers: [UsersService], // Register the UserService as a provider
  exports: [UsersService], // Make the UserService available for dependency injection in other modules
})
export class UsersModule {}