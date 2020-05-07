import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import 'dotenv/config';

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [path.resolve(__dirname, '..', 'models', '*')],
  migrations: [path.resolve(__dirname, '..', 'migrations', '*')],
  synchronize: true,
  logging: true,
};

module.exports = options;