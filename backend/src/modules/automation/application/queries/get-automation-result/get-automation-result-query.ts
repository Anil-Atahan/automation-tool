import { Query } from '../../../../../shared/application/messaging/query';
import { Result } from '../../../../../shared/domain/result';
import { AutomationResultResponse } from './automation-result-response';

export class GetAutomationResultQuery implements Query<Result<AutomationResultResponse>> {
    constructor(public readonly automationResultId: string) {}
  }
  
  