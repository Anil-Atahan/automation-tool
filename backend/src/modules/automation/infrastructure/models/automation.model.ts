import { DataTypes, Model, Sequelize } from 'sequelize';
import { DomainEventDispatcher } from '../../../../shared/domain/domain-event-dispatcher';
import { AutomationCreatedEvent } from '../../domain/automation/events/automation-created.event';
import { Scenario } from '../../domain/automation/models/scenario';


export class AutomationModel extends Model {
  declare id: string;
  declare name: string;
  declare url: string;
  declare user_agent?: string;
  declare scenario: Scenario;
  declare created_at: Date;
  declare updated_at?: Date;

  static initModel(sequelize: Sequelize) {
    AutomationModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_agent: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        scenario: {
          type: DataTypes.JSONB,
          allowNull: false,
          set(value) {
            this.setDataValue('scenario', JSON.stringify(value));
          },
          get() {
            const value = this.getDataValue('scenario');
            return value ? (JSON.parse(value) as Scenario) : null;
          }
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
        modelName: 'Automation',
        tableName: 'automations',
        createdAt: 'created_at',
        updatedAt: 'updated_at', 
        timestamps: true,
        hooks: {
          afterCreate: async (instance: AutomationModel) => {
            const event = new AutomationCreatedEvent(instance.id, instance.name, instance.url, instance.scenario, instance.user_agent);
            await DomainEventDispatcher.dispatch(event);
          }
        },
      },
    );
  }
}

export default AutomationModel;
