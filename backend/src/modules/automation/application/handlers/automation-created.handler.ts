import { injectable } from 'inversify';
import { AutomationCreatedEvent } from '../../domain/automation/events/automation-created.event';
import { DomainEventHandler } from '../../../../shared/application/messaging/domain-event-handler.interface';
import logger from '../../../../shared/infrastructure/logger/logger';

@injectable()
export class AutomationCreatedHandler implements DomainEventHandler<AutomationCreatedEvent> {
  async handle(event: AutomationCreatedEvent): Promise<void> {
    logger.info(`Automation created: ${event.name} (${event.automationId}) at ${event.occurredAt}`);
  }
}
