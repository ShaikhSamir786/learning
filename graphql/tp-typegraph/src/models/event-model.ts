import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../configs/config-sequelize-postgres";
import { EventAttributes, EventCreationAttributes } from "./types/event-types";
import { User } from "./user-model";

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public id!: number;
  public title!: string;
  public description!: string | null;
  public date!: Date;
  public location!: string | null;
  public createdBy!: number;
  public invitedEmails!: string[] | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initEventModel = (sequelizeInstance: Sequelize): typeof Event => {
  Event.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      date: { type: DataTypes.DATE, allowNull: false },
      location: { type: DataTypes.STRING, allowNull: true },
      createdBy: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" }, onDelete: "CASCADE" },
      invitedEmails: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true, defaultValue: [] },
    },
    {
      sequelize: sequelizeInstance,
      tableName: "events",
      modelName: "Event",
      timestamps: true,
    }
  );

  return Event;
};
