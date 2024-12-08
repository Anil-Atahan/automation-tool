import { DomainEvent } from './domain-event';

export abstract class BaseEntity {
  private _domainEvents: DomainEvent[] = [];

  protected constructor(protected _id: string, protected _createdAt: Date, protected _updatedAt?: Date) {}

  get id(): string {
    return this._id;
  }

  protected set id(value: string) {
    this._id = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  protected set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  protected set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  clearDomainEvents(): void {
    this._domainEvents = [];
  }
}
