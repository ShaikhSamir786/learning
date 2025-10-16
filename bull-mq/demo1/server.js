import express from 'express';
import emailQueue from './email-queue.js';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import config from './config.js';
import router from "./routes.js"


const app = express();
app.use(express.json());

// -------------------
// Bull-Board Setup
// -------------------
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(emailQueue)],
  serverAdapter,
});

app.use('/admin/queues', serverAdapter.getRouter());

// -------------------
// Routes
// -------------------
app.use("/api" , router )

// -------------------
// Start Server
// -------------------
const PORT = config.app.port || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Bull-Board running on http://localhost:${PORT}/admin/queues`);
});


