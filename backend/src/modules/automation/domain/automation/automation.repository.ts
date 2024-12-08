import { PagedResponse } from '../../../../shared/domain/paged-response';
import { Result } from '../../../../shared/domain/result';
import { Automation } from './automation.entity';

export interface AutomationRepository {
  findById(id: string): Promise<Result<Automation>>;
  save(automation: Automation): Promise<Result>;
  getPaged(pageIndex: number, pageSize: number): Promise<Result<PagedResponse<Automation>>>;
}
