const express = require("express");
const router = express.Router();

const {
  insertUser,
  getalluser,
  updateuserdetails,
  deleteuser,
  unmanagedTransaction,
  managedTransaction
} = require("../controllers/user-contoller");

router.post("/register", insertUser);
router.get("/getalluser", getalluser);
router.put("/updateuser/:id", updateuserdetails);
router.delete("/deleteuser/:id", deleteuser);
router.post("/unmanagedtransaction", unmanagedTransaction);
router.post("/managedtransaction", managedTransaction);

module.exports = router;
