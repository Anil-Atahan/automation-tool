import { Request, Response } from 'express';
import { ExecuteAutomationCommand } from '../../../../application/commands/execute-automation/execute-automation-command';
import { MediatorImpl } from '../../../../../../shared/application/messaging/mediator-impl';
import { Result } from '../../../../../../shared/domain/result';

const mediator = new MediatorImpl();

export const executeAutomation = async (req: Request, res: Response) => {
  const id = req.params.id;
  const command = new ExecuteAutomationCommand(
    id
  );
  
  const result : Result = await mediator.send(command);
  if (result.isFailure) {
    res.status(400).json({ message: result.error });
    return;
  }
  
  res.status(200).json(result.value);
};