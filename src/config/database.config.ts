import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const env = process.env.NODE_ENV || 'development';
  const map = {
    development: {
      mysql: {
        host: process.env.DEV_MYSQL_HOST,
        port: process.env.DEV_MYSQL_PORT,
        username: process.env.DEV_MYSQL_USER,
        password: process.env.DEV_MYSQL_PASSWORD,
        database: process.env.DEV_MYSQL_DB,
      },
      postgres: {
        host: process.env.DEV_PG_HOST,
        port: process.env.DEV_PG_PORT,
        username: process.env.DEV_PG_USER,
        password: process.env.DEV_PG_PASSWORD,
        database: process.env.DEV_PG_DB,
      },
    },
  };
  return map[env];
});
