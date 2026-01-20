import { registerAs } from '@nestjs/config';
import {
  mysqlConnection,
  pgConnection,
  redisConnection,
} from './database.connections';

export default registerAs('database', () => {
  const env = process.env.NODE_ENV || 'development';
  const map = {
    development: {
      mysql: mysqlConnection(),
      postgres: pgConnection(),
      redis: redisConnection(),
    },
  };
  return map[env];
});
