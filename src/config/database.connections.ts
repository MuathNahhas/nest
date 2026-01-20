export const mysqlConnection = () => ({
  host: process.env.DEV_MYSQL_HOST,
  port: process.env.DEV_MYSQL_PORT,
  username: process.env.DEV_MYSQL_USER,
  password: process.env.DEV_MYSQL_PASSWORD,
  database: process.env.DEV_MYSQL_DB,
});

export const pgConnection = () => ({
  host: process.env.DEV_PG_HOST,
  port: process.env.DEV_PG_PORT,
  username: process.env.DEV_PG_USER,
  password: process.env.DEV_PG_PASSWORD,
  database: process.env.DEV_PG_DB,
});

export const redisConnection = () => ({
  host: process.env.DEV_REDIS_HOST,
  port: process.env.DEV_REDIS_PORT,
  username: process.env.DEV_REDIS_USERNAME,
  password: process.env.DEV_REDIS_PASSWORD,
  database: process.env.DEV_REDIS_DATABASE,
  family: process.env.DEV_REDIS_FAMILY,
});
