import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import logger from '../logger/logger';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'automation_tool',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: (msg) => logger.info(msg),
  },
);


sequelize.authenticate()
  .then(() => logger.info('Database connection established successfully.'))
  .catch((err) => logger.error('Unable to connect to the database:', err));

export default sequelize;