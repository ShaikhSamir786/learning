// CommonJS Imports
const { createServer } = require('http');
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/use/ws');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const bodyParser = require('body-parser');
const cors = require('cors');
// Federation Subgraph Schema Builder
const { buildSubgraphSchema } = require('@apollo/subgraph'); 

// Import all necessary parts from your local files
// We assume resolver.js now exports the resolvers AND the directive transformers
const { 
  typeDefs 
} = require('./schema'); 

const { 
  resolvers,
  upperDirectiveTransformer,
  authDirectiveTransformer,
  transformPriceDirectiveTransformer,
  MOCK_CONTEXT // Assuming MOCK_CONTEXT is used for the authentication check
} = require('./resolver');

// Local PubSub instance


// --- Server Setup ---
const PORT = 4000;
const app = express();
const httpServer = createServer(app);

// 1. Build the base Federated Subgraph Schema
let schema = buildSubgraphSchema({ typeDefs, resolvers });

// 2. Apply Custom Directive Transformations
// This is the core customization for your resolvers!
// The custom directive logic (from the previous step) is executed here 
// to wrap the original resolvers with directive logic (@upper, @auth, @transformPrice).
schema = upperDirectiveTransformer(schema, 'upper');
schema = authDirectiveTransformer(schema, 'auth', MOCK_CONTEXT); 
schema = transformPriceDirectiveTransformer(schema, 'transformPrice');


// 🧠 Create WebSocket server for subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// 🪄 Add context for subscriptions
const serverCleanup = useServer(
  {
    schema,
    context: async () => ({ pubsub }), // Subscriptions context
  },
  wsServer
);

// 🧱 Apollo server (for queries + mutations)
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

async function startServer() {
  await server.start();

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    // Context for Queries/Mutations is defined in expressMiddleware options.
    expressMiddleware(server, {
      // NOTE: We merge the request context (req, res) with the pubsub utility
      // and any necessary mock context (like user role) for resolver execution.
      context: async ({ req, res }) => ({ req, res, pubsub, ...MOCK_CONTEXT }), 
    })
  );

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`📡 Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
}

startServer();