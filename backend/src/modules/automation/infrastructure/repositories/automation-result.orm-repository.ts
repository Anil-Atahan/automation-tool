import { AutomationResultRepository } from '../../domain/automation-result/automation-result.repository';
import { AutomationResultModel } from '../models/automation-result.model';
import { AutomationResult } from '../../domain/automation-result/automation_result.entity';
import { Result } from '../../../../shared/domain/result';
import { PagedResponse } from '../../../../shared/domain/paged-response';
import { AutomationStatus } from '../../domain/enums/automation-status';
import { injectable } from 'tsyringe';

@injectable()
export class ORMAutomationResultRepository implements AutomationResultRepository {
  async getPaged(automationId: string, pageIndex: number, pageSize: number): Promise<Result<PagedResponse<AutomationResult>>> {
    const automationResults = await AutomationResultModel.findAndCountAll({ where: { automation_id: automationId } ,offset: pageIndex * pageSize, limit: pageSize });
    if (automationResults.count === 0) return Result.ok({ data: [] as AutomationResult[], pageIndex: 0, pageSize: 0, totalCount: 0 } as PagedResponse<AutomationResult>);
    var pagedResponse = {
        data: automationResults.rows.map((automationResult) => AutomationResult.fromPersistence(automationResult.id, automationResult.automation_id, 
          automationResult.status, automationResult.execution_time, automationResult.created_at, automationResult.screenshot, automationResult.updated_at)),
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalCount: automationResults.count
      } as PagedResponse<AutomationResult>;
    return Result.ok(pagedResponse);
  }
  async findById(id: string): Promise<Result<AutomationResult>> {
    const automationResult = await AutomationResultModel.findByPk(id);
    if (!automationResult) return Result.fail('Automation result not found');
    return Result.ok(AutomationResult.fromPersistence(automationResult.id, automationResult.automation_id, automationResult.status as AutomationStatus,
      automationResult.execution_time, automationResult.created_at, automationResult.screenshot, automationResult.updated_at));
  }

  async findByAutomationId(automationId: string): Promise<Result<AutomationResult>> {
    const automationResult = await AutomationResultModel.findOne({ where: { automation_id: automationId } });
    if (!automationResult) return Result.fail('Automation result not found');
    return Result.ok(AutomationResult.fromPersistence(automationResult.id, automationResult.automation_id, automationResult.status as AutomationStatus,
      automationResult.execution_time, automationResult.created_at, automationResult.screenshot, automationResult.updated_at));
  }

  async save(automationResult: AutomationResult): Promise<Result> {
    const [_, created] = await AutomationResultModel.upsert({
      id: automationResult.id,
      automation_id: automationResult.automationId,
      status: automationResult.status,
      screenshot: automationResult.screenshot,
      execution_time: automationResult.executionTime,
      created_at: automationResult.createdAt,
      updated_at: automationResult.updatedAt
    });
    return created ? Result.ok() : Result.fail('Failed to save automation result');
  }
}
