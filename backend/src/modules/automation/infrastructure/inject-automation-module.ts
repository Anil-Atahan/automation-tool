import globalContainer from '../../../shared/infrastructure/global-container';
import { AutomationCreatedHandler } from '../application/handlers/automation-created.handler';
import { DomainEventDispatcher } from '../../../shared/domain/domain-event-dispatcher';
import { initializeModels } from './persistence/initialize-models'
import { CreateAutomationHandler } from '../application/commands/create-automation/create-automation-handler';
import { ExecuteAutomationHandler } from '../application/commands/execute-automation/execute-automation-handler';
import { GetAutomationHandler } from '../application/queries/get-automation/get-automation-handler';
import { GetAutomationsHandler } from '../application/queries/get-automations/get-automations-handler';
import { GetAutomationResultHandler } from '../application/queries/get-automation-result/get-automation-result-handler';
import { GetAutomationResultsHandler } from '../application/queries/get-automation-results/get-automation-results-handler';
import { AutomationRepository } from '../domain/automation/automation.repository';
import { AutomationResultRepository } from '../domain/automation-result/automation-result.repository';
import { ORMAutomationResultRepository } from './repositories/automation-result.orm-repository';
import { PagedResponse } from '../../../shared/domain/paged-response';
import { AutomationResponse } from '../application/queries/get-automation/automation-response';
import { Result } from '../../../shared/domain/result';
import { RequestHandler } from '../../../shared/application/messaging/request-handler';
import { CreateAutomationCommand } from '../application/commands/create-automation/create-automation-command';
import { GetAutomationsQuery } from '../application/queries/get-automations/get-automations-query';
import { GetAutomationQuery } from '../application/queries/get-automation/get-automation-query';
import { ORMAutomationRepository } from '../infrastructure/repositories/automation.orm-repository';
import { GetAutomationResultQuery } from '../application/queries/get-automation-result/get-automation-result-query';
import { AutomationResultResponse } from '../application/queries/get-automation-result/automation-result-response';
import { GetAutomationResultsQuery } from '../application/queries/get-automation-results/get-automation-results-query';
import { ExecuteAutomationCommand } from '../application/commands/execute-automation/execute-automation-command';


export const injectAutomationModule = () => {
  globalContainer.bind<AutomationRepository>('AutomationRepository').to(ORMAutomationRepository);
  globalContainer.bind<AutomationResultRepository>('AutomationResultRepository').to(ORMAutomationResultRepository);

  globalContainer.bind<RequestHandler<GetAutomationsQuery, Result<PagedResponse<AutomationResponse>>>>('GetAutomationsQuery')
  .to(GetAutomationsHandler).inTransientScope();

  globalContainer.bind<RequestHandler<GetAutomationQuery, Result<AutomationResponse>>>("GetAutomationQuery")
  .to(GetAutomationHandler).inTransientScope();

  globalContainer.bind<RequestHandler<CreateAutomationCommand, Result>>("CreateAutomationCommand")
  .to(CreateAutomationHandler).inTransientScope();

  globalContainer.bind<RequestHandler<GetAutomationResultQuery, Result<AutomationResultResponse>>>("GetAutomationResultQuery")
  .to(GetAutomationResultHandler).inTransientScope();

  globalContainer.bind<RequestHandler<GetAutomationResultsQuery, Result<PagedResponse<AutomationResultResponse>>>>("GetAutomationResultsQuery")
  .to(GetAutomationResultsHandler).inTransientScope();

  globalContainer.bind<RequestHandler<ExecuteAutomationCommand, Result>>("ExecuteAutomationCommand")
  .to(ExecuteAutomationHandler).inTransientScope();

  DomainEventDispatcher.register('AutomationCreated', new AutomationCreatedHandler());

  initializeModels();
}