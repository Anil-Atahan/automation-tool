import { Request, Response, NextFunction } from 'express';
import Database from '../../../../shared/infrastructure/persistence/database';

export function permissionMiddleware(requiredPermission: string) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const db = Database.getInstance().getSequelizeInstance();

      const user = await db.models.User.findOne({ where: { id: userId } });
      if (!user) {
        res.status(401).json({ error: 'User not found' });
        return;
      }

      const role = await db.models.Role.findOne({ where: { id: (user as any).role_id } });
      if (!role) {
        res.status(403).json({ error: 'Role not found' });
        return;
      }

      const rolePermissions = await db.models.RolePermission.findAll({
        where: { role_id: (role as any).id },
        include: [{ model: db.models.Permission }],
      });

      const permissions = rolePermissions.map((rp) => (rp.get('Permission') as any).name);

      if (!permissions.includes(requiredPermission)) {
        res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        return;
      }

      next(); // Proceed to the next middleware
    } catch (err) {
      console.error('Permission Middleware Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  };
}
