import { Router } from 'express';
import { validateCreateAutomationRequest } from '../middlewares/validate-create-automation-request';
import { createAutomation } from './automation/create-automation/create-automation';
import { executeAutomation } from './automation/execute-automation/execute-automation';
import { getAutomation } from './automation/get-automation/get-automation';
import { getAutomations } from './automation/get-automations/get-automations';

const router = Router();

router.post('/', validateCreateAutomationRequest, createAutomation);

router.post('/execute/:id', executeAutomation);

router.get('/:id', getAutomation);

router.get('/', getAutomations);

export default router;