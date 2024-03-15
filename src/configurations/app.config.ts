import * as dotenv from "dotenv";
import { getEnv } from "./env.config";

dotenv.config();

export const AppConfig = {
  name: process.env.APP_NAME as string,
  env: getEnv(),
  port: Number(process.env.PORT),
  host: process.env.APP_HOST as string,
  key: process.env.APP_KEY as string,
  environment: process.env.APP_ENV as string,
  redis: {
    host: process.env.REDIS_HOST as string,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME as string,
    password: process.env.REDIS_PASSWORD as string,
  },
  database: {
    client: process.env.DB_CLIENT || 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE as string,
      user: process.env.DB_USERNAME as string,
      password: process.env.DB_PASSWORD as string,
      port: process.env.DB_PORT || undefined,
      socketPath: process.env.DB_SOCKET,
    },
    pool: {
      min: parseInt(process.env.DB_POOL_MIN as string) || 2,
      max: parseInt(process.env.DB_POOL_MAX as string) || 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  }
};
