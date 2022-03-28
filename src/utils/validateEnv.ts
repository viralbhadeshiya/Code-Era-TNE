import { bool, cleanEnv, port, str } from 'envalid';

export const validateEnv = cleanEnv(process.env, {
    BASE_URL: str({
        default: 'http://localhost:3500',
    }),
    NODE_ENV: str({
        devDefault: 'development',
        default: 'production',
        choices: ['development', 'production'],
        desc: 'Current Environment',
    }),
    APP_PORT: port(),
    MONGODB_URL: str({
        devDefault: 'mongodb://localhost:27017/JUMP-START-expressjs-v2-dev',
        default: 'mongodb://localhost:27017/JUMP-START-expressjs-v2-prod',
    }),
    DEBUG_MODE: bool({ default: false }),
});
