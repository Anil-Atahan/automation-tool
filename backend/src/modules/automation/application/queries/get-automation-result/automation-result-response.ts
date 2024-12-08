import { AutomationStatus } from '../../../domain/enums/automation-status';

export interface AutomationResultResponse {
    id: string;
    automationId: string;
    status: AutomationStatus;
    executionTime: number;
    createdAt: Date;
    screenshot?: Uint8Array;
    updatedAt?: Date;
  }
  