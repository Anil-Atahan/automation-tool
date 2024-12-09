import { DataTypes, Model, Sequelize } from 'sequelize';

export class UserModel extends Model {
  declare id: string;
  declare email: string;
  declare password_hash: string;
  declare role_id: string;
  declare created_at: Date;
  declare updated_at?: Date;

  static initModel(sequelize: Sequelize) {
    UserModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password_hash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role_id: {
          type: DataTypes.UUID,
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
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  }
}

export default UserModel;
