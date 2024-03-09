import * as dotenv from "dotenv";
import { getEnv } from "./env.config";

dotenv.config();

export const AppConfig = {
  name: process.env.APP_NAME as string,
  env: getEnv(),
  port: Number(process.env.APP_PORT),
  host: process.env.APP_HOST as string,
  key: process.env.APP_KEY as string,
  environment: process.env.APP_ENV as string,
  redis: {
    host: process.env.REDIS_HOST as string,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME as string,
    password: process.env.REDIS_PASSWORD as string,
  },
  database: process.env.DATABASE_URL as string,
};
