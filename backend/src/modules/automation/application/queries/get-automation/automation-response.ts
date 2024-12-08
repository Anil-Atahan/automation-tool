import { Scenario } from '../../../domain/automation/models/scenario';

export interface AutomationResponse {
    id: string;
    name: string;
    url: string;
    userAgent?: string;
    scenario: Scenario,
    createdAt: Date;
    updatedAt?: Date;
  }
  