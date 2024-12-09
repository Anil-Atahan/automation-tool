import { injectable } from 'inversify';
import { AutomationRepository } from '../../../domain/automation/automation.repository';
import { RequestHandler } from '../../../../../shared/application/messaging/request-handler';
import { GetAutomationQuery } from './get-automation-query';
import { AutomationResponse } from './automation-response';
import { Result } from '../../../../../shared/domain/result';
import globalContainer from '../../../../../shared/infrastructure/global-container';

@injectable()
export class GetAutomationHandler
  implements RequestHandler<GetAutomationQuery, Result<AutomationResponse>>
{
  constructor(
    private readonly repository = globalContainer.get<AutomationRepository>('AutomationRepository')
 ) {}

  async handle(query: GetAutomationQuery): Promise<Result<AutomationResponse>> {
    const automation = await this.repository.findById(query.id);

    if (automation.isFailure) return Result.fail<AutomationResponse>('Automation not found');

    return Result.ok({
        id: automation.value.id,
        name: automation.value.name,
        url: automation.value.url,
        userAgent: automation.value.userAgent,
        scenario: automation.value.scenario,
        createdAt: automation.value.createdAt,
        updatedAt: automation.value.updatedAt
      } as AutomationResponse);
  }
}
