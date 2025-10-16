import express from 'express';
import setupDashboard from './ds.js';
import './worker.js'
import config from './config.js';
import router from "./routes.js"


const app = express();
app.use(express.json());
setupDashboard(app);


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


