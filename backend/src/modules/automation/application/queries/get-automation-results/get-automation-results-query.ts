import { CacheQuery } from '../../../../../shared/application/messaging/cache-query';
import { Result } from '../../../../../shared/domain/result';
import { AutomationResultResponse } from '../get-automation-result/automation-result-response';
import { PagedResponse } from '../../../../../shared/domain/paged-response';

export class GetAutomationResultsQuery implements CacheQuery<Result<PagedResponse<AutomationResultResponse>>> {
    public readonly cacheKey: string;

    constructor(public readonly automationId: string, public readonly pageIndex: number, public readonly pageSize: number) {
      this.cacheKey = `GetAutomationResults-${automationId}-${pageIndex}-${pageSize}`;
    }
  }
  
  