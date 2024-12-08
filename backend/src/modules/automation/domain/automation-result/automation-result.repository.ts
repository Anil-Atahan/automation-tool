import { AutomationResult } from './automation_result.entity';
import { Result } from '../../../../shared/domain/result';
import { PagedResponse } from '../../../../shared/domain/paged-response';

export interface AutomationResultRepository {
  findById(id: string): Promise<Result<AutomationResult>>;
  save(automation: AutomationResult): Promise<Result>;
  getPaged(automationId: string, pageIndex: number, pageSize: number): Promise<Result<PagedResponse<AutomationResult>>>;
}
