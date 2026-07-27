import { developmentEnv } from './enviroment-modes/development.env';
import { productionEnv } from './enviroment-modes/production.env';
import { staggingEnv } from './enviroment-modes/stagging.env';
import { EnviromentInterface } from './enviroment.interface';

const enviroments: Record<string, () => EnviromentInterface> = {
  development: developmentEnv,
  stagging: staggingEnv,
  production: productionEnv,
};

export default () => {
  const envMode = process.env.NODE_ENV || 'development';
  const getEnvLoad = enviroments[envMode];
  return getEnvLoad();
};
