import { createServer } from 'http';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';


import { typeDefs } from './schema.js';
import { resolvers } from './resolver.js';
import { pubsub } from './pubsub.js';

const PORT = 4000;

const app = express();
const httpServer = createServer(app);
let schema = makeExecutableSchema({ typeDefs, resolvers });


// 🧠 Create WebSocket server for subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// 🪄 Add context for subscriptions
const serverCleanup = useServer(
  {
    schema,
    context: async () => ({ pubsub }),
  },
  wsServer
);

// 🧱 Apollo server (for queries + mutations)
const server1 = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res, pubsub }),
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

await server1.start();

app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(server1)
);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  console.log(`📡 Subscriptions ready at ws://localhost:${PORT}/graphql`);
});
