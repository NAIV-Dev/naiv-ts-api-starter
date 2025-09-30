require('dotenv').config();
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Server } from '@naiv/codegen-model-typeorm';
import path from 'path';

const server = new Server();
server.run({
  port: +(process.env.PORT ?? 9415),
  types_path: path.resolve(__dirname, 'types'),
  implementation_path: path.resolve(__dirname, 'implementation'),
  async beforeStart() {
    await AppDataSource.initialize();
  }
});
