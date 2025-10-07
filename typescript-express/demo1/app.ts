import express ,{Request , Response} from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req : Request ,  res : Response) : void => {
  res.send("🚀 Hello from Express + TypeScript!");
});


app.get("/home", (req ,  res) => {
  res.send("🚀 Hello from Express + TypeScript!");
});



// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
