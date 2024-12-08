import { Request, Response } from 'express';
import { GetAutomationResultQuery } from '../../../../application/queries/get-automation-result/get-automation-result-query';
import { MediatorImpl } from '../../../../../../shared/application/messaging/mediator-impl';
import { Result } from '../../../../../../shared/domain/result';

const mediator = new MediatorImpl();

export const getAutomationResult = async (req: Request, res: Response) => {
  const query = new GetAutomationResultQuery(
    req.params.id
  )

  const result : Result = await mediator.send(query);
  if (result.isFailure) {
    res.status(400).json({ message: result.error });
    return;
  }
  
  res.status(200).json(result.value);
};