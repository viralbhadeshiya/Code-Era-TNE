import pino from 'pino';
import PinoHttp from 'pino-http';
import { v4 as uuidv4 } from 'uuid';
import Config from '../environment/index';

// formate logs for env
export const pinoFormateConfig = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
            ignore: 'pid,hostname',
            colorize: true,
        },
    },
});

const debugConfig = {
    res(reply) {
        if (!Config.DEBUG_MODE) {
            return;
        }
        // eslint-disable-next-line consistent-return
        return reply;
    },
    req(request) {
        if (!Config.DEBUG_MODE) {
            return;
        }
        // eslint-disable-next-line consistent-return
        return request;
    },
};

export const customLogger = {
    development: PinoHttp({
        redact: ['HTTP_Request.headers'],
        logger: pinoFormateConfig,
        level: 'trace',
        genReqId() {
            return uuidv4();
        },
        customLogLevel(res, err) {
            if (err) {
                return 'error';
            }
            if (res && res.statusCode === 500) {
                return 'fatal';
            }
            if (res.statusCode >= 400 && res.statusCode < 500) {
                return 'error';
            }
            return 'info';
        },
        customSuccessMessage(res) {
            return `Request completed with statusCode ${res.statusCode}`;
        },
        customErrorMessage(error) {
            return error.message;
        },
        customAttributeKeys: {
            req: 'HTTP_Request',
            res: 'HTTP_Response',
            err: 'HTTP_Error',
            responseTime: 'Execute_Time',
        },
        serializers: debugConfig,
    }),
    production: PinoHttp({
        logger: pino(),
        serializers: debugConfig,
        redact: ['req.headers'],
    }),
};
