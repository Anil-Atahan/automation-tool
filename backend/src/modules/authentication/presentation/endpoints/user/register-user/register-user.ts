import { Request, Response } from 'express';
import { MediatorImpl } from "../../../../../../shared/application/messaging/mediator-impl";
import { Result } from '../../../../../../shared/domain/result';
import { RegisterUserCommand } from '../../../../application/commands/register-user/register-user-command';
import logger from '../../../../../../shared/infrastructure/logger/logger';

const mediator = new MediatorImpl();

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const command = new RegisterUserCommand(
    email,
    password
  );
  
  const result : Result = await mediator.send(command);
  logger.info(`User registered: ${result.isSuccess}`);
  if (result.isFailure) {
    res.status(400).json({ message: result.error });
    return;
  }
  
  res.status(200).json(result.value);
};