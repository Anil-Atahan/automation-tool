import { injectable } from 'inversify';
import { Automation } from '../../../domain/automation/automation.entity';
import { AutomationRepository } from '../../../domain/automation/automation.repository';
import { RequestHandler } from '../../../../../shared/application/messaging/request-handler';
import { CreateAutomationCommand } from '../create-automation/create-automation-command';
import { Result } from '../../../../../shared/domain/result';
import globalContainer from '../../../../../shared/infrastructure/global-container';

@injectable()
export class CreateAutomationHandler
  implements RequestHandler<CreateAutomationCommand, Result>
{
  constructor(
    private readonly repository = globalContainer.get<AutomationRepository>('AutomationRepository')
 ) {}
  async handle(command: CreateAutomationCommand): Promise<Result> {
    const automation = Automation.create(
      command.name,
      command.url,
      command.scenario,
      command.userAgent
    );

    await this.repository.save(automation);
    return Result.ok();
  }
}