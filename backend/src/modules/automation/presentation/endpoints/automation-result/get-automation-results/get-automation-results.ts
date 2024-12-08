import { Request, Response } from 'express';
import { GetAutomationResultsQuery } from '../../../../application/queries/get-automation-results/get-automation-results-query';
import { MediatorImpl } from '../../../../../../shared/application/messaging/mediator-impl';
import { Result } from '../../../../../../shared/domain/result';

const mediator = new MediatorImpl();

export const getAutomationResults = async (req: Request, res: Response) => {
  const query = new GetAutomationResultsQuery(
    req.params.automationId,
    parseInt(req.query.pageIndex as string) || 0,
    parseInt(req.query.pageSize as string) || 10
  )


  const result : Result = await mediator.send(query);
  if (result.isFailure) {
    res.status(400).json({ message: result.error });
    return;
  }
  
  res.status(200).json(result.value);
};