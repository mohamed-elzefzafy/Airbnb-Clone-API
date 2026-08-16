import { EnviromentInterface } from '../enviroment.interface';

export const defaultEnv = (): EnviromentInterface => ({
  PORT: Number(process.env.PORT),
  FULLBACK_LANGUAGE: process.env.FULLBACK_LANGUAGE as string,
  mongodbUri: process.env.MONGO_URI as string,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN as string,
  REFRESH_TOKEN_EXPIRE_IN: process.env.REFRESH_TOKEN_EXPIRE_IN as string,
});
