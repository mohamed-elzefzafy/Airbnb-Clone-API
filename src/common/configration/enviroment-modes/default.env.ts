import { EnviromentInterface } from '../enviroment.interface';

export const defaultEnv = (): EnviromentInterface => ({
  PORT: Number(process.env.PORT),
});
