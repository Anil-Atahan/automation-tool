import { injectable } from 'inversify';
import { AutomationRepository } from '../../../domain/automation/automation.repository';
import { RequestHandler } from '../../../../../shared/application/messaging/request-handler';
import { ExecuteAutomationCommand } from './execute-automation-command';
import { Result } from '../../../../../shared/domain/result';
import { AutomationRunner } from '../../../infrastructure/playwright/automation.runner';
import { AutomationResultRepository } from '../../../domain/automation-result/automation-result.repository';
import globalContainer from '../../../../../shared/infrastructure/global-container';

@injectable()
export class ExecuteAutomationHandler
  implements RequestHandler<ExecuteAutomationCommand, Result>
{
  constructor(
    private readonly repository = globalContainer.get<AutomationRepository>('AutomationRepository'),
    private readonly automationResultRepository = globalContainer.get<AutomationResultRepository>('AutomationResultRepository')
 ) {}

  async handle(command: ExecuteAutomationCommand): Promise<Result> {
    const automation = await this.repository.findById(command.id);
    if (!automation) {
      return Result.fail('Automation not found');
    }
    try {
        const result = await AutomationRunner.runTask(automation.value);
        if (result.isFailure) {
            return Result.fail(result.error);
        }
    
        await this.automationResultRepository.save(result.value);
        return Result.ok();
    } catch (error) {
        if (error instanceof Error) {
            return Result.fail(error.message);
        }
        return Result.fail('An unknown error occurred');
    }
  }
}