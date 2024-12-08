import { Request, Response } from 'express';
import { CreateAutomationCommand } from '../../../../application/commands/create-automation/create-automation-command';
import { MediatorImpl } from '../../../../../../shared/application/messaging/mediator-impl';
import { Result } from '../../../../../../shared/domain/result';

const mediator = new MediatorImpl();

export const createAutomation = async (req: Request, res: Response) => {
  const { name, url, scenario, userAgent } = req.body;

  const command = new CreateAutomationCommand(
    name,
    url,
    scenario,
    userAgent
  );
  
  const result : Result = await mediator.send(command);
  if (result.isFailure) {
    res.status(400).json({ message: result.error });
    return;
  }
  
  res.status(200).json(result.value);
};