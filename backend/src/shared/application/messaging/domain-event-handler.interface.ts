import { DomainEvent } from '../../domain/domain-event';

export interface DomainEventHandler<T extends DomainEvent> {
  handle(event: T): Promise<void>;
}
