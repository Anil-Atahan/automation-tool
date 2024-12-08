import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../../domain/errors/base-error';

const errorHandler = (
    err: Error, 
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof BaseError) {
        res.status(err.statusCode).json({ errors: err.serializeErrors() });
        return;
    }

    res.status(500).json({
        errors: [{ message: 'Something went wrong', code: 'UNKNOWN_ERROR' }],
    });
};

export default errorHandler;
