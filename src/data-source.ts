import 'reflect-metadata';

import 'dotenv/config';

import { DataSource, DataSourceOptions } from 'typeorm';

// import config from './config';
import { User } from './database/entities/UserEntity';
import { Image } from './database/entities/ImageEntity';
import { PasswordResetToken } from './database/entities/PasswordResetTokenEntity';

// const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = config;

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'claude',
  database: 'code-challenge',
  synchronize: false,
  logging: false,
  entities: [User, Image, PasswordResetToken],
  migrations: ['dist/database/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
