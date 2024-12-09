import { Router } from 'express';
import { validateCreateAutomationRequest } from '../middlewares/validate-create-automation-request';
import { createAutomation } from './automation/create-automation/create-automation';
import { executeAutomation } from './automation/execute-automation/execute-automation';
import { getAutomation } from './automation/get-automation/get-automation';
import { getAutomations } from './automation/get-automations/get-automations';
import { authMiddleware } from '../../../../shared/infrastructure/middlewares/auth-middleware';
import { permissionMiddleware } from '../../../../shared/infrastructure/middlewares/permission-middleware';
import { PermissionName } from '../../../../shared/infrastructure/auth/permission-name';

const router = Router();

router.post('/', authMiddleware, permissionMiddleware(PermissionName.MANAGE_AUTOMATIONS), validateCreateAutomationRequest, createAutomation);

router.post('/execute/:id', authMiddleware, permissionMiddleware(PermissionName.MANAGE_AUTOMATIONS), executeAutomation);

router.get('/:id', authMiddleware, permissionMiddleware(PermissionName.MANAGE_AUTOMATIONS), getAutomation);

router.get('/', authMiddleware, permissionMiddleware(PermissionName.MANAGE_AUTOMATIONS),  getAutomations);

export default router;