import { injectable } from 'inversify';
import { AutomationResultRepository } from '../../../domain/automation-result/automation-result.repository';
import { RequestHandler } from '../../../../../shared/application/messaging/request-handler';
import { Result } from '../../../../../shared/domain/result';
import { GetAutomationResultQuery } from './get-automation-result-query';
import { AutomationResultResponse } from './automation-result-response';
import globalContainer from '../../../../../shared/infrastructure/global-container';

@injectable()
export class GetAutomationResultHandler
  implements RequestHandler<GetAutomationResultQuery, Result<AutomationResultResponse>>
{
  constructor(private readonly repository = globalContainer.get<AutomationResultRepository>('AutomationResultRepository') ) {}

  async handle(query: GetAutomationResultQuery): Promise<Result<AutomationResultResponse>> {
    const automationResult = await this.repository.findById(query.automationResultId);

    if (automationResult.isFailure) return Result.fail<AutomationResultResponse>('Automation results not found');

    return Result.ok({
        id: automationResult.value.id,
        automationId: automationResult.value.automationId,
        status: automationResult.value.status,
        executionTime: automationResult.value.executionTime,
        screenshot: automationResult.value.screenshot,
        createdAt: automationResult.value.createdAt,
        updatedAt: automationResult.value.updatedAt
        } as AutomationResultResponse);
  }
}
