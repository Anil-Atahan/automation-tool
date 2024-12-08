import { BaseError } from './base-error';

export class SystemError extends BaseError {
    constructor(message: string = 'An unexpected error occurred') {
        super(message, 500, 'SYSTEM_ERROR');
    }

    serializeErrors() {
        return [{ message: this.message, code: this.code }];
    }
}
