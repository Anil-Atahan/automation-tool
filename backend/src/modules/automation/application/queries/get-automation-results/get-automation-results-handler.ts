import { injectable } from 'tsyringe';
import { AutomationResultRepository } from '../../../domain/automation-result/automation-result.repository';
import { RequestHandler } from '../../../../../shared/application/messaging/request-handler';
import { Result } from '../../../../../shared/domain/result';
import { GetAutomationResultsQuery } from './get-automation-results-query';
import { AutomationResultResponse } from '../get-automation-result/automation-result-response';
import { PagedResponse } from '../../../../../shared/domain/paged-response';
import globalContainer from '../../../../../shared/infrastructure/global-container';

@injectable()
export class GetAutomationResultsHandler
  implements RequestHandler<GetAutomationResultsQuery, Result<PagedResponse<AutomationResultResponse>>>
{
  constructor(private readonly repository = globalContainer.get<AutomationResultRepository>('AutomationResultRepository') ) {}

  async handle(query: GetAutomationResultsQuery): Promise<Result<PagedResponse<AutomationResultResponse>>> {
    const automationResults = await this.repository.getPaged(query.automationId, query.pageIndex, query.pageSize);

    if (automationResults.isFailure) return Result.fail<PagedResponse<AutomationResultResponse>>('Automation results not found');

    const automationResultsResponse = automationResults.value.data.map((item) => {
        return {
            id: item.id,
            automationId: item.automationId,
            status: item.status,
            executionTime: item.executionTime,
            createdAt: item.createdAt,
            screenshot: item.screenshot,
            updatedAt: item.updatedAt
          } as AutomationResultResponse;
      });
  
      return Result.ok({
        data: automationResultsResponse, 
        pageIndex: automationResults.value.pageIndex,
        pageSize: automationResults.value.pageSize,
        totalCount: automationResults.value.totalCount
      } as PagedResponse<AutomationResultResponse>);
  }
}
