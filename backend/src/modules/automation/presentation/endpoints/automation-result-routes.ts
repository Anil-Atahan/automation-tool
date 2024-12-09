import { PermissionName } from '../../../../shared/infrastructure/auth/permission-name';
import { authMiddleware, permissionMiddleware } from '../../../authentication/index';
import { getAutomationResult } from './automation-result/get-automation-result/get-automation-result';
import { getAutomationResults } from './automation-result/get-automation-results/get-automation-results';
import { Router } from 'express';

const router = Router();

router.get('/:id', authMiddleware, permissionMiddleware(PermissionName.MANAGE_AUTOMATIONS), getAutomationResult);

router.get('/:automationId', authMiddleware, permissionMiddleware(PermissionName.MANAGE_AUTOMATIONS), getAutomationResults);

export default router;