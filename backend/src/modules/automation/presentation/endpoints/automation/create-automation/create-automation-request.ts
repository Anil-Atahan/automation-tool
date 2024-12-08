import { Scenario } from '../../../../domain/automation/models/scenario';

export class CreateAutomationRequest{
    constructor(
      public readonly name: string,
      public readonly url: string,
      public readonly scenario: Scenario,
      public readonly userAgent?: string,
    ) {}
  }
  