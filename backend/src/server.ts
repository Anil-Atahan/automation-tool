import 'reflect-metadata';
import app from './app';
import sequelize from './shared/infrastructure/persistence/database';
import logger from './shared/infrastructure/logger/logger';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync({ alter: true }); 
   
    logger.info('Database synchronized successfully.');

    app.listen(PORT, () => logger.info(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    logger.error('Failed to start the server:', err);
  }
})();