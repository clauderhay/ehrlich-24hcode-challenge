import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
