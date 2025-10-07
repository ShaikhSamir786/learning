import express, { Request, Response } from "express";
import dotenv from 'dotenv'
import  connectDB from './configs/mongodb-config'
import router from './routes/router'



dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
connectDB()

// Routes
app.get("/", (req: Request, res: Response)  : void=> {
   res.json({ message: "Hello from the typescript!" });
});



app.use("/api", router);



// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
