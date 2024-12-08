import { Request, Response, NextFunction } from 'express';
import { CreateAutomationRequestValidator } from '../endpoints/automation/create-automation/create-automation-request-validator';
import { CreateAutomationRequest } from '../endpoints/automation/create-automation/create-automation-request';
import { ValidationError } from '../../../../shared/domain/errors/validation-error';

export const validateCreateAutomationRequest= async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { name, url, scenario, userAgent } = req.body;

    const command = new CreateAutomationRequest(name, url, scenario, userAgent);
    const errors = CreateAutomationRequestValidator.validator.validate(command);

    if (errors.length > 0) {
        throw new ValidationError(errors.map((msg) => ({ field: 'CreateAutomationRequest', message: msg })));
    }

    next(); 
};
