export interface EnviromentInterface {
  PORT: number;
  FULLBACK_LANGUAGE: string;
  mongodbUri: string;
  JWT_SECRET_KEY: string;
  JWT_EXPIRE_IN: string;
  REFRESH_TOKEN_EXPIRE_IN: string;
}
