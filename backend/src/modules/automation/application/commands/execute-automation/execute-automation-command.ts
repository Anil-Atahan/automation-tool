import { Request } from '../../../../../shared/application/messaging/base-request';
import { Result } from '../../../../../shared/domain/result';

export class ExecuteAutomationCommand implements Request<Result> {
  constructor(
    public readonly id: string,
  ) {}
}