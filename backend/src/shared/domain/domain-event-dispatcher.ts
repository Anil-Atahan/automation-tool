import { DomainEvent } from './domain-event';
import { DomainEventHandler } from '../application/messaging/domain-event-handler.interface';

export class DomainEventDispatcher {
  private static handlers: Map<string, DomainEventHandler<any>[]> = new Map();

  static register<T extends DomainEvent>(
    eventName: string,
    handler: DomainEventHandler<T>,
  ): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)?.push(handler);
  }

  static async dispatch(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.getEventName());
    if (handlers) {
      await Promise.all(handlers.map((handler) => handler.handle(event)));
    }
  }
}
