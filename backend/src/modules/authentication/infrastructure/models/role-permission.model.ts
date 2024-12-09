import { DataTypes, Model, Sequelize } from 'sequelize';

export class RolePermissionModel extends Model {
  declare role_id: string;
  declare permission_id: string;

  static initModel(sequelize: Sequelize) {
    RolePermissionModel.init(
      {
        role_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'roles',
            key: 'id',
          },
        },
        permission_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'permissions',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        modelName: 'RolePermission',
        tableName: 'role_permissions',
        timestamps: false,
      }
    );
  }
}

export default RolePermissionModel;
