import { sequelize } from "../configs/config-sequelize-postgres";
import { initUserModel, User } from "./user-model";
import { initEventModel, Event } from "./event-model";

// Initialize models
initUserModel(sequelize);
initEventModel(sequelize);

// Define associations
Event.belongsTo(User, { foreignKey: "createdBy", as: "creator" });
User.hasMany(Event, { foreignKey: "createdBy", as: "events", onDelete: "CASCADE" });

// Export everything
export { sequelize, User, Event };
