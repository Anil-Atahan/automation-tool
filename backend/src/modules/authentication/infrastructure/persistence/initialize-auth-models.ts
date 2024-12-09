import UserModel from '../models/user.model';
import RoleModel from '../models/role.model';
import PermissionModel from '../models/permission.model';
import RolePermissionModel from '../models/role-permission.model';
import { Sequelize } from 'sequelize';

export function initializeAuthModels(sequelize: Sequelize) {
  UserModel.initModel(sequelize);
  RoleModel.initModel(sequelize);
  PermissionModel.initModel(sequelize);
  RolePermissionModel.initModel(sequelize);

  RoleModel.hasMany(UserModel, { foreignKey: 'role_id' });
  UserModel.belongsTo(RoleModel, { foreignKey: 'role_id' });

  RoleModel.belongsToMany(PermissionModel, {
    through: RolePermissionModel,
    foreignKey: 'role_id',
    otherKey: 'permission_id',
  });

  PermissionModel.belongsToMany(RoleModel, {
    through: RolePermissionModel,
    foreignKey: 'permission_id',
    otherKey: 'role_id',
  });

  RolePermissionModel.belongsTo(RoleModel, { foreignKey: 'role_id' });
  RolePermissionModel.belongsTo(PermissionModel, { foreignKey: 'permission_id' });
}
