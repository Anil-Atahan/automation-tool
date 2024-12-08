import { getAutomationResult } from './automation-result/get-automation-result/get-automation-result';
import { getAutomationResults } from './automation-result/get-automation-results/get-automation-results';
import { Router } from 'express';

const router = Router();

router.get('/:id', getAutomationResult);

router.get('/:automationId', getAutomationResults);

export default router;