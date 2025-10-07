const express = require("express");
const router = express.Router();

const {
  insertUser,
  getalluser,
  aggregateExample,
  updateuserdetails,
  deleteuser,
} = require("../controllers/user-contoller");

router.post("/register", insertUser);
router.get("/getalluser", getalluser);
router.get("/aggregate", aggregateExample);
router.put("/updateuser/:id", updateuserdetails);
router.delete("/deleteuser/:id", deleteuser);

module.exports = router;
