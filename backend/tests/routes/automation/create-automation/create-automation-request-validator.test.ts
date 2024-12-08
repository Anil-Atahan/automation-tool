import { CreateAutomationRequestValidator } from '../../../../src/modules/automation/presentation/endpoints/automation/create-automation/create-automation-request-validator';
import { CreateAutomationRequest } from '../../../../src/modules/automation/presentation/endpoints/automation/create-automation/create-automation-request';

describe('CreateAutomationRequestValidator', () => {
    it('should validate a correct command', () => {
        const command = new CreateAutomationRequest(
            'Test Automation',
            'http://example.com',
            { scenarioSteps: [] },
            'Mozilla/5.0'
        );

        const errors = CreateAutomationRequestValidator.validator.validate(command);
        expect(errors).toHaveLength(0); 
    });

    it('should return errors for an invalid request', () => {
        const command = new CreateAutomationRequest('', '', null as any);

        const errors = CreateAutomationRequestValidator.validator.validate(command);
        expect(errors.length).toBeGreaterThan(0);
    });
});
