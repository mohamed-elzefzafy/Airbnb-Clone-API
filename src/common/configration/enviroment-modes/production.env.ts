import { EnviromentInterface } from '../enviroment.interface';
import { defaultEnv } from './default.env';

export const productionEnv = (): EnviromentInterface => ({
...defaultEnv(),
PORT: 5000
});
