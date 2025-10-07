import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { makeExecutableSchema } from "@graphql-tools/schema";

// ❌ FIX 1: Import the correct function name: 'rateLimitDirective', not 'createRateLimitDirective'.
const { rateLimitDirective } = require('graphql-rate-limit-directive');

import { User } from "./models/user-model";
import { dbConnect } from "./configs/config-sequelize-postgres";
import { typeDefs } from "./graphql/typedef";
import { resolvers } from "./graphql/resolvers";

dotenv.config();


interface ContextUser {
  id: string;
}

// Define the structure of your GraphQL context object
interface MyContext {
  ip: string | undefined;
  user: ContextUser | undefined;
}

const PORT = Number(process.env.PORT) || 4000;
const app = express();

const startServer = async () => {
  try {
    console.log("🟡 Connecting to the database...");
    await dbConnect();

    console.log("🟡 Syncing database models...");
    await User.sync({ alter: true });
    console.log("✅ User model synced successfully.");

    console.log("🟡 Setting up GraphQL rate limiter...");

    // 1️⃣ FIX 2: Call rateLimitDirective() with options to get the destructurable object.
     const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } =
      rateLimitDirective({
        identifyContext: (ctx: MyContext) => ctx.user?.id || ctx.ip || "anonymous",
      });

    console.log("🚀 ~ startServer ~ rateLimitDirectiveTransformer:", rateLimitDirectiveTransformer);

    // 2️⃣ Build schema with directive typeDefs + your existing ones
    // NOTE: rateLimitDirectiveTypeDefs is a string, not a function, so remove the ()
    let schema = makeExecutableSchema({
      typeDefs: [rateLimitDirectiveTypeDefs, typeDefs],
      resolvers,
    });

    // 3️⃣ Apply the rate limit transformer
    schema = rateLimitDirectiveTransformer(schema);

    console.log("🟡 Starting Apollo Server...");
    const server = new ApolloServer({ schema });
    await server.start();

    // 4️⃣ Pass context so identifyContext can use req.ip or req.user
    app.use(
      "/graphql",
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({
          // Cleaned-up way to get IP address
          ip: req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress,
          // Assuming user is authenticated and attached to the context later (e.g., via middleware)
          user: (req as any).user, 
        }),
      })
    );

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at: http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error("❌ Error starting the server:", err);
    process.exit(1);
  }
};

startServer();