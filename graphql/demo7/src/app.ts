import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import bodyParser from "body-parser";
import dotenv from "dotenv";


import { User } from "./models/user-model";
import { dbConnect } from "./configs/config-sequelize-postgres";
import { typeDefs } from "./graphql/typedef";
import { resolvers } from "./graphql/resolvers";

dotenv.config();


const PORT = Number(process.env.PORT) || 4000;
const app = express();
const startServer = async () => {
  try {
    console.log("🟡 Connecting to the database...");
    await dbConnect();

    console.log("🟡 Syncing database models...");
    await User.sync({ alter: true }); // alter = safe schema migration
    console.log("✅ User model synced successfully.");

    console.log("🟡 Starting Apollo Server...");
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    app.use("/graphql", bodyParser.json(), expressMiddleware(server));

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at: http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error("❌ Error starting the server:", err);
    process.exit(1); // Exit with failure (important in production)
  }
};
 
startServer();