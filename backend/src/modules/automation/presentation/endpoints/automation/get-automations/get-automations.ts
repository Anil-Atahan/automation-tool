import { Request, Response } from 'express';
import { GetAutomationsQuery } from '../../../../application/queries/get-automations/get-automations-query';
import { AutomationResponse } from '../../../../application/queries/get-automation/automation-response';
import { MediatorImpl } from '../../../../../../shared/application/messaging/mediator-impl';
import { Result } from '../../../../../../shared/domain/result';
import { PagedResponse } from '../../../../../../shared/domain/paged-response';

const mediator = new MediatorImpl();

export const getAutomations = async (req: Request, res: Response) => {
    const pageIndex = parseInt(req.query.pageIndex as string, 10) || 0;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
    const query = new GetAutomationsQuery(pageIndex, pageSize);

    const result = await mediator.send<GetAutomationsQuery, Result<PagedResponse<AutomationResponse>>>(query);
      if (result.isFailure) {
        res.status(400).json({ message: result.error });
        return;
      }

      res.status(200).json(result.value);
};