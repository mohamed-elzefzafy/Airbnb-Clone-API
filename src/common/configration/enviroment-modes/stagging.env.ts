import { EnviromentInterface } from '../enviroment.interface';
import { defaultEnv } from './default.env';

export const staggingEnv = (): EnviromentInterface => ({
...defaultEnv(),
PORT: 4000
});
