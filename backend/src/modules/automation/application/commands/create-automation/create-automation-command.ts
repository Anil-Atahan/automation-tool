import { Request } from '../../../../../shared/application/messaging/base-request';
import { Result } from '../../../../../shared/domain/result';
import { Scenario } from '../../../domain/automation/models/scenario';

export class CreateAutomationCommand implements Request<Result> {
  constructor(
    public readonly name: string,
    public readonly url: string,
    public readonly scenario: Scenario,
    public readonly userAgent?: string,
  ) {}
}
