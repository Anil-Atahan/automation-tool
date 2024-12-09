import AutomationModel from '../models/automation.model';
import AutomationResultModel from '../models/automation-result.model';
import { Sequelize } from 'sequelize';

export const initializeAutomationModels = (sequelize: Sequelize) => {
  AutomationModel.initModel(sequelize);
  AutomationResultModel.initModel(sequelize);
};
