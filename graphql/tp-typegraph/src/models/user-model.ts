import { Model, DataTypes, Sequelize, HasManyGetAssociationsMixin, HasManyAddAssociationMixin } from "sequelize";
import { sequelize } from "../configs/config-sequelize-postgres";
import { UserAttributes, UserCreationAttributes } from "./types/user-types";
import { Event } from "./event-model";

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public isActive!: boolean;
  public verified!: boolean;
  public otp!: string | null;
  public otpExpiry!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association mixins
  public getEvents!: HasManyGetAssociationsMixin<Event>;
  public addEvent!: HasManyAddAssociationMixin<Event, number>;
}

export const initUserModel = (sequelizeInstance: Sequelize): typeof User => {
  User.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
      password: { type: DataTypes.STRING, allowNull: false },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
      otp: { type: DataTypes.STRING, allowNull: true },
      otpExpiry: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize: sequelizeInstance,
      tableName: "users",
      modelName: "User",
      timestamps: true,
    }
  );

  return User;
};
