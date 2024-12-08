import { validateCreateAutomationRequest } from '../../../../src/modules/automation/presentation/middlewares/validate-create-automation-request';
import { Request, Response } from 'express';

describe('validateCreateAutomationRequest Middleware', () => {
    it('should call next() if validation passes', () => {
        const req = {
            body: {
                name: 'Valid Automation',
                url: 'http://example.com',
                scenario: { scenarioSteps: [] },
            },
        } as Request;

        const res = {} as Response;
        const next = jest.fn();

        validateCreateAutomationRequest(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 400 if validation fails', () => {
        const req = {
            body: {
                name: '',
                url: '',
                scenario: null,
            },
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as any;

        const next = jest.fn();

        validateCreateAutomationRequest(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ errors: expect.any(Array) }));
    });
});
