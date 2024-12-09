import 'reflect-metadata';
import app from './app';
import logger from './shared/infrastructure/logger/logger';
import { seedRolesAndPermissions } from './modules/authentication/infrastructure/seed/seed-roles-permissions';
import Database from './shared/infrastructure/persistence/database';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    const db = Database.getInstance();
    await db.connect();
    await db.sync();

    logger.info('Database synchronized successfully.');
    await seedRolesAndPermissions();

    app.listen(PORT, () => logger.info(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    logger.error('Failed to start the server:', err);
  }
})();