import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_NAME = process.env.DB_NAME as string | undefined;
const DB_USER = process.env.DB_USER as string | undefined;
const DB_PASSWORD = process.env.DB_PASSWORD as string | undefined;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT) || 5432;

// ✅ Create Sequelize instance with types
export const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD!, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false, // set true if you want SQL logs
});

// ✅ Database connection function
export const dbConnect = async (): Promise<void> => {
  try {
    if (!DB_NAME || !DB_USER || DB_PASSWORD === undefined) {
      throw new Error(
        "Missing required DB env vars. Make sure DB_NAME, DB_USER and DB_PASSWORD are set."
      );
    }
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
   
    throw error;
  }
};
