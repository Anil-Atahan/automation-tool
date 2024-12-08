import { injectable, inject } from 'tsyringe';
import { AutomationRepository } from '../../../domain/automation/automation.repository';
import { RequestHandler } from '../../../../../shared/application/messaging/request-handler';
import { GetAutomationsQuery } from './get-automations-query';
import { AutomationResponse } from '../get-automation/automation-response';
import { Result } from '../../../../../shared/domain/result';
import { PagedResponse } from '../../../../../shared/domain/paged-response';
import globalContainer from '../../../../../shared/infrastructure/global-container';

@injectable()
export class GetAutomationsHandler
  implements RequestHandler<GetAutomationsQuery, Result<PagedResponse<AutomationResponse>>>
{
  constructor(
     private readonly repository = globalContainer.get<AutomationRepository>('AutomationRepository')
  ) {}

  async handle(query: GetAutomationsQuery): Promise<Result<PagedResponse<AutomationResponse>>> {
    const automations = await this.repository.getPaged(query.pageIndex, query.pageSize);

    if (automations.isFailure) return Result.fail<PagedResponse<AutomationResponse>>('Automations not found');

    const automationsResponse = automations.value.data.map((item) => {
        return {
            id: item.id,
            name: item.name,
            url: item.url,
            userAgent: item.userAgent,
            createdAt: item.createdAt,
            scenario: item.scenario,
            updatedAt: item.updatedAt
          } as AutomationResponse;
      });
  
      return Result.ok({
        data: automationsResponse, 
        pageIndex: automations.value.pageIndex,
        pageSize: automations.value.pageSize,
        totalCount: automations.value.totalCount
      } as PagedResponse<AutomationResponse>);
  }
}
