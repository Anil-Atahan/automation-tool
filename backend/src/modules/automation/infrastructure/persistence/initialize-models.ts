import sequelize from '../../../../shared/infrastructure/persistence/database';
import AutomationModel from '../models/automation.model';
import AutomationResultModel from '../models/automation-result.model';

export const initializeModels = () => {
  AutomationModel.initModel(sequelize);
  AutomationResultModel.initModel(sequelize);
};

export default sequelize;
