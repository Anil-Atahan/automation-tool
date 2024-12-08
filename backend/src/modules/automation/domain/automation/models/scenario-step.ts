import { AutomationAction } from '../../enums/automation-action';

export class ScenarioStep {
    constructor(
        public order: number,
        public cssSelector: string,
        public xPathSelector: string,
        public expectedText: string,
        public action: AutomationAction
      ) {}
}
