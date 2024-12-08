import { BaseEntity } from '../../../../shared/domain/base.entity';
import { AutomationStatus } from '../enums/automation-status';
import { deleteFromCache } from '../../../../shared/infrastructure/caching/cache';

export class AutomationResult extends BaseEntity {
    private constructor(
      id: string,
      private _automationId: string,
      private _status: AutomationStatus,
      private _executionTime: number,
      createdAt: Date,
      private _screenshot?: Uint8Array,
      updatedAt?: Date,
    )  {
        super(id, createdAt, updatedAt);
      }

    get automationId(): string {
        return this._automationId; 
    }

    private set automationId(value: string) {
        this._automationId = value;
    }

    get status(): AutomationStatus {
        return this._status;
    }

    private set status(value: AutomationStatus) {
        this._status = value;
    }

    get executionTime(): number {
        return this._executionTime;
    }

    private set executionTime(value: number) {
        this._executionTime = value;
    }

    get screenshot(): Uint8Array | undefined {
        return this._screenshot;
    }

    private set screenshot(value: Uint8Array | undefined) {
        this._screenshot = value;
    }

    static create(automationId: string, status: AutomationStatus, executionTime: number, screenshot: Uint8Array): AutomationResult {
      const automationResult =  new AutomationResult(
        crypto.randomUUID(),
        automationId, 
        status, 
        executionTime,
         new Date(), 
         screenshot);

      deleteFromCache('GetAutomations');
      
      return automationResult;
    }

    update(status: AutomationStatus, executionTime: number, screenshot: Uint8Array): void {
        this.status = status;
        this.executionTime = executionTime;
        this.screenshot = screenshot;
        this.updatedAt = new Date();
        
        deleteFromCache('GetAutomations');
    }

    static fromPersistence(
      id: string,
      automationId: string,
      status: AutomationStatus,
      executionTime: number,
      createdAt: Date,
      screenshot?: Uint8Array,
      updatedAt?: Date,
    ): AutomationResult {
      return new AutomationResult(id, automationId, status, executionTime, createdAt, screenshot, updatedAt);
    }
}