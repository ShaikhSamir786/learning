import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/logic";

const router = Router();

router.post("/create", createUser);     // Create
router.get("/getuser", getUsers);        // Read All
router.get("/getuserbyid/:id", getUser);      // Read One
router.put("/updateuserbyid/:id", updateUser);   // Update
router.delete("/deleteuserbyid/:id", deleteUser);// Delete

export default router;
