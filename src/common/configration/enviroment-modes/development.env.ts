import { EnviromentInterface } from '../enviroment.interface';
import { defaultEnv } from './default.env';

export const developmentEnv = (): EnviromentInterface => ({
...defaultEnv(),
});
