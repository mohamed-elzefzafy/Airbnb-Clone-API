import * as joi from 'joi';

export const envSchema = joi.object({
  PORT: joi.number().integer().default(3000),
  NODE_ENV: joi.string().required(),
  FULLBACK_LANGUAGE: joi.string().default('ar'),
  MONGO_URI: joi.string().required(),
  JWT_SECRET_KEY: joi.string().required(),
  JWT_EXPIRE_IN: joi.string().required().default('7d'),
  REFRESH_TOKEN_EXPIRE_IN: joi.string().required().default('15d'),
});
