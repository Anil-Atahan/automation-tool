import { DataTypes, Model, Sequelize } from 'sequelize';
import { AutomationStatus } from '../../domain/enums/automation-status';

export class AutomationResultModel extends Model {
  declare id: string;
  declare automation_id: string;
  declare status: AutomationStatus;
  declare screenshot?: Uint8Array;
  declare execution_time: number;
  declare created_at: Date;
  declare updated_at?: Date;

  static initModel(sequelize: Sequelize) {
    AutomationResultModel.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          automation_id: {
            type: DataTypes.UUID,
            allowNull: false
          },
          status: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
              if (!Object.values(AutomationStatus).includes(value as AutomationStatus)) {
                throw new Error(`Invalid status: ${value}. Allowed statuses are: ${Object.values(AutomationStatus).join(', ')}`);
              }
              this.setDataValue('status', value);
            },
            get() {
              const value = this.getDataValue('status');
              switch (value) {
                case 'Success':
                  return AutomationStatus.Success;
                case 'Failure':
                  return AutomationStatus.Failure;
                case 'Timeout':
                  return AutomationStatus.Timeout;
                case 'Error':
                  return AutomationStatus.Error;
              }
            }
          },
          screenshot: {
            type: DataTypes.BLOB,
            allowNull: true,
          },
          execution_time: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          created_at: {
              type: DataTypes.DATE,
              allowNull: false,
          },
          updated_at: {
              type: DataTypes.DATE,
              allowNull: true,
          },
        },
        {
          sequelize,
          modelName: 'AutomationResult',
          tableName: 'automation_results',
          timestamps: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at', 
        },
      );
  }
}

export default AutomationResultModel;
