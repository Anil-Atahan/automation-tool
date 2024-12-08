import { CacheQuery } from '../../../../../shared/application/messaging/cache-query';
import { PagedResponse } from '../../../../../shared/domain/paged-response';
import { Result } from '../../../../../shared/domain/result';
import { AutomationResponse } from '../get-automation/automation-response';

export class GetAutomationsQuery implements CacheQuery<Result<PagedResponse<AutomationResponse>>> {
    public readonly cacheKey: string;

    constructor(public readonly pageIndex: number, public readonly pageSize: number) {
      this.cacheKey = `GetAutomations-${pageIndex}-${pageSize}`;
    }
  }
  
  