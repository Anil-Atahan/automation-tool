import { Sequelize } from 'sequelize';
import { initializeAuthModels } from '../../../modules/authentication/infrastructure/persistence/initialize-auth-models';
import { initializeAutomationModels } from '../../../modules/automation/infrastructure/persistence/initialize-automation-models';
import dotenv from 'dotenv';

dotenv.config();

export class Database {
  private static instance: Database;
  private sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize(
        process.env.DB_NAME || 'automation_tool',
        process.env.DB_USER || 'postgres',
        process.env.DB_PASSWORD || 'postgres',
        {
          host: process.env.DB_HOST || 'localhost',
          dialect: 'postgres',
          logging: false
        },
      );
      
    this.initializeModels();
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private initializeModels() {
    initializeAuthModels(this.sequelize);
    initializeAutomationModels(this.sequelize);
  }

  public async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Database connection established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      process.exit(1); // Exit process if database connection fails
    }
  }

  public async sync(force: boolean = false) {
    try {
      await this.sequelize.sync({ force });
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Error syncing database:', error);
      process.exit(1); // Exit process if sync fails
    }
  }

  public getSequelizeInstance(): Sequelize {
    return this.sequelize;
  }
}

export default Database;
