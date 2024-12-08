import { Result } from '../../../../../shared/domain/result';
import { AutomationResponse } from './automation-response';
import { Query } from '../../../../../shared/application/messaging/query';

export class GetAutomationQuery implements Query<Result<AutomationResponse>> {
  constructor(public readonly id: string) {
  }
}

