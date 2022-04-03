function getErrorFromCode(statusCode) {
    switch (statusCode) {
        case 500: {
            return 'DATABASE_ERROR';
        }
        case 400: {
            return 'BAD_REQUEST';
        }
        case 401: {
            return 'UNAUTHORIZED';
        }
        case 424: {
            return 'FAILED_DEPENDENCY';
        }
        case 404: {
            return 'NOT_FOUND';
        }
        default:
            return 'UNHANDLED_ERROR';
    }
}

export default class HttpException extends Error {
    private statusCode: number;

    private error: string;

    private errorCode: string;

    private originalError: Error;

    private meta: any;

    constructor(statusCode: number, message: string, errorCode: string, err: any, meta?: any) {
        super(message);
        this.statusCode = statusCode;
        this.error = getErrorFromCode(statusCode);
        this.errorCode = errorCode;
        this.message = message;
        this.originalError = err;
        this.meta = meta;
    }
}
