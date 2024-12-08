import { Automation } from '../../domain/automation/automation.entity';
import { AutomationRepository } from '../../domain/automation/automation.repository';
import { AutomationModel } from '../models/automation.model';
import { Result } from '../../../../shared/domain/result';
import { PagedResponse } from '../../../../shared/domain/paged-response';
import { injectable } from 'tsyringe';

@injectable()
export class ORMAutomationRepository implements AutomationRepository {
  async getPaged(pageIndex: number, pageSize: number): Promise<Result<PagedResponse<Automation>>> {
    const automations = await AutomationModel.findAndCountAll({ offset: pageIndex * pageSize, limit: pageSize });
    if (automations.count === 0) return Result.ok({ data: [] as Automation[], pageIndex: 0, pageSize: 0, totalCount: 0 } as PagedResponse<Automation>);
    var pagedResponse = {
        data: automations.rows.map((automation) => Automation.fromPersistence(automation.id, automation.name, automation.url, 
          automation.scenario, automation.created_at, automation.user_agent, automation.updated_at)),
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalCount: automations.count
      } as PagedResponse<Automation>;
    return Result.ok(pagedResponse);
  }
  async findById(id: string): Promise<Result<Automation>> {
    const automation = await AutomationModel.findByPk(id);
    if (!automation) return Result.fail('Automation not found');

    return Result.ok(Automation.fromPersistence(automation.id, automation.name, automation.url, 
      automation.scenario, automation.created_at, automation.user_agent, automation.updated_at));
  }

  async save(automation: Automation) : Promise<Result> {
    const [_, created] = await AutomationModel.upsert({
        id: automation.id,
        name: automation.name,
        url: automation.url,
        user_agent: automation.userAgent,
        scenario: automation.scenario,
        created_at: automation.createdAt,
        updated_at: automation.updatedAt
    });

    return created ? Result.ok() : Result.fail('Failed to save automation');
  }
}
