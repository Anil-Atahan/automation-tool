import { BaseValidator } from '../../../../../../shared/application/validation/base-validator';
import { Scenario } from '../../../../domain/automation/models/scenario';
import { ScenarioStep } from '../../../../domain/automation/models/scenario-step';
import { AutomationAction } from '../../../../domain/enums/automation-action';
import { CreateAutomationRequest } from './create-automation-request';

export class CreateAutomationRequestValidator {
    static validator = new BaseValidator<CreateAutomationRequest>()
        // Validate name
        .validateNested(
            'name',
            new BaseValidator<string>().isRequired().hasMinLength(3).hasMaxLength(50)
        )
        // Validate URL
        .validateNested(
            'url',
            new BaseValidator<string>().isRequired().matchesPattern(
                /^https?:\/\/[^\s$.?#].[^\s]*$/,
                'URL must be a valid HTTP/HTTPS URL.'
            )
        )
        // Validate Scenario
        .validateNested(
            'scenario',
            new BaseValidator<Scenario>()
                .isRequired()
                .validateNested(
                    'scenarioSteps',
                    new BaseValidator<ScenarioStep[]>()
                        .isArray('ScenarioSteps must be an array.')
                        .addCustomRule((steps) => steps.length > 0, 'ScenarioSteps cannot be empty.')
                        .addCustomRule(
                            (steps) =>
                                steps.every((step) => CreateAutomationRequestValidator.validateScenarioStep(step).length === 0),
                            'One or more ScenarioSteps are invalid.'
                        )
                )
        )
        // Validate optional userAgent
        .validateNested('userAgent', new BaseValidator<string | undefined>().isString());

    // Helper method for validating ScenarioStep
    private static validateScenarioStep(step: ScenarioStep): string[] {
        return new BaseValidator<ScenarioStep>()
            .addCustomRule((step) => step.order > 0, 'Order must be a positive integer.')
            .validateNested(
                'cssSelector',
                new BaseValidator<string>().isRequired().hasMinLength(1, 'CSS Selector is required.')
            )
            .validateNested(
                'xPathSelector',
                new BaseValidator<string>().isRequired().hasMinLength(1, 'XPath Selector is required.')
            )
            .validateNested(
                'expectedText',
                new BaseValidator<string>().hasMinLength(1, 'Expected text must not be empty.')
            )
            .validateNested(
                'action',
                new BaseValidator<AutomationAction>().addCustomRule(
                    (value) => Object.values(AutomationAction).includes(value),
                    'Invalid action specified.'
                )
            )
            .validate(step);
    }
}
