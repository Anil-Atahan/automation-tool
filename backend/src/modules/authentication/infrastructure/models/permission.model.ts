import { DataTypes, Model, Sequelize } from 'sequelize';

export class PermissionModel extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
  declare created_at: Date;
  declare updated_at?: Date;

  static initModel(sequelize: Sequelize) {
    PermissionModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
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
        modelName: 'Permission',
        tableName: 'permissions',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  }
}

export default PermissionModel;
