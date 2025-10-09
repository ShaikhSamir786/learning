const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const logger = require("./configs/logger");
const {sequelize} = require("./configs/sequelize-postgre")
const {initModels} = require("./models/index-model")
const bodyParser = require('body-parser')
const rateLimit = require("express-rate-limit");
const { buildSchema , createApolloServer} = require("./graphql/apollo-server")
const { expressMiddleware } =require("@as-integrations/express5")
const  { rateLimitDirective } = require("graphql-rate-limit-directive")

require("dotenv").config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 10 requests per windowMs
  standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // disable the old `X-RateLimit-*` headers
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
});

app.use(express.json());
app.use(limiter);




const startServer = async () => {
  try {
  
    // 1 
    console.log("🟡 Syncing database models...");
    await initModels(sequelize);
    console.log("✅ User model synced successfully.");

    













    
    // 1️⃣ FIX 2: Call rateLimitDirective() with options to get the destructurable object.
     const { rateLimitDirectiveTransformer } =
      rateLimitDirective({
        identifyContext: (ctx) => ctx.user?.id || ctx.ip || "anonymous",
      });

    console.log("🚀 ~ startServer ~ rateLimitDirectiveTransformer:", rateLimitDirectiveTransformer);

    // 2️⃣ Build schema with directive typeDefs + your existing ones
    // NOTE: rateLimitDirectiveTypeDefs is a string, not a function, so remove the ()
    let schema = buildSchema()

    // 3️⃣ Apply the rate limit transformer
    schema = rateLimitDirectiveTransformer(schema);

    console.log("🟡 Starting Apollo Server...");
    const server = createApolloServer(schema)
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
          user: (req).user, 
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
