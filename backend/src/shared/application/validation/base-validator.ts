import { Validator } from './validation-rule';

export class BaseValidator<T> extends Validator<T> {
    isRequired(message: string = 'Value is required.'): this {
        this.addRule((value) => (value == null || value === '' ? message : null));
        return this;
    }

    isString(message: string = 'Value must be a string.'): this {
        this.addRule((value) => (typeof value !== 'string' ? message : null));
        return this;
    }

    isNumber(message: string = 'Value must be a number.'): this {
        this.addRule((value) => (typeof value !== 'number' ? message : null));
        return this;
    }

    hasMinLength(min: number, message: string = `Value must be at least ${min} characters.`): this {
        this.addRule((value) =>
            typeof value === 'string' && value.length < min ? message : null
        );
        return this;
    }

    hasMaxLength(max: number, message: string = `Value must be no more than ${max} characters.`): this {
        this.addRule((value) =>
            typeof value === 'string' && value.length > max ? message : null
        );
        return this;
    }

    isEmail(message: string = 'Value must be a valid email address.'): this {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.addRule((value) =>
            typeof value === 'string' && !emailRegex.test(value) ? message : null
        );
        return this;
    }

    matchesPattern(pattern: RegExp, message: string = 'Value does not match the required pattern.'): this {
        this.addRule((value) =>
            typeof value === 'string' && !pattern.test(value) ? message : null
        );
        return this;
    }

    isInRange(min: number, max: number, message: string = `Value must be between ${min} and ${max}.`): this {
        this.addRule((value) =>
            typeof value === 'number' && (value < min || value > max) ? message : null
        );
        return this;
    }

    isBoolean(message: string = 'Value must be a boolean.'): this {
        this.addRule((value) => (typeof value !== 'boolean' ? message : null));
        return this;
    }

    isDate(message: string = 'Value must be a valid date.'): this {
        this.addRule((value) =>
            !(value instanceof Date) || isNaN(value.getTime()) ? message : null
        );
        return this;
    }

    isArray(message: string = 'Value must be an array.'): this {
        this.addRule((value) => (!Array.isArray(value) ? message : null));
        return this;
    }

    hasArrayLength(min: number, max: number, message: string = `Array length must be between ${min} and ${max}.`): this {
        this.addRule((value) =>
            Array.isArray(value) && (value.length < min || value.length > max)
                ? message
                : null
        );
        return this;
    }

    isPositive(message: string = 'Value must be a positive number.'): this {
        this.addRule((value) =>
            typeof value === 'number' && value <= 0 ? message : null
        );
        return this;
    }

    isNegative(message: string = 'Value must be a negative number.'): this {
        this.addRule((value) =>
            typeof value === 'number' && value >= 0 ? message : null
        );
        return this;
    }

    isCustomRule(rule: (value: T) => boolean, customMessage: string): this {
        this.addRule((value) => (!rule(value) ? customMessage : null));
        return this;
    }

    addCustomRule(rule: (value: T) => boolean, message: string): this {
        this.addRule((value) => (!rule(value) ? message : null));
        return this;
    }

    validateNested<K extends keyof T>(key: K, validator: Validator<T[K]>): this {
        this.addRule((value) => {
            if (value && typeof value === 'object' && key in value) {
                const nestedErrors = validator.validate(value[key]);
                return nestedErrors.length > 0
                    ? `Validation failed for ${String(key)}: ${nestedErrors.join(', ')}`
                    : null;
            }
            return null;
        });
        return this;
    }
    
}