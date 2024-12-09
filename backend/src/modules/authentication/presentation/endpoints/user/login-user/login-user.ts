import { Request, Response } from 'express';
import { MediatorImpl } from "../../../../../../shared/application/messaging/mediator-impl";
import { LoginUserCommand } from "../../../../application/commands/login-user/login-user-command";
import { Result } from '../../../../../../shared/domain/result';

const mediator = new MediatorImpl();

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const command = new LoginUserCommand(
    email,
    password
  );
  
  const result : Result = await mediator.send(command);
  if (result.isFailure) {
    res.status(400).json({ message: result.error });
    return;
  }
  
  res.status(200).json(result.value);
};