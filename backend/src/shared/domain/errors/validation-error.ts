import { BaseError } from './base-error';

export class ValidationError extends BaseError {
    constructor(public errors: { field: string; message: string }[]) {
        super('Validation failed', 422, 'VALIDATION_ERROR');
    }

    serializeErrors() {
        return this.errors.map((error) => ({
            ...error,
            code: this.code,
        }));
    }
}
