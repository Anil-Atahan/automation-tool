import { DomainEvent } from '../../../../../shared/domain/domain-event';
import { Scenario } from '../models/scenario';

export class AutomationCreatedEvent extends DomainEvent {
  constructor(
    public readonly automationId: string,
    public readonly name: string,
    public readonly url: string,
    public readonly scenario: Scenario,
    public readonly userAgent?: string
  ) {
    super();
  }

  getEventName(): string {
    return 'AutomationCreated';
  }
}
