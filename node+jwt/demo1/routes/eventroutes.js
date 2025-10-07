// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
    createEvent,
  inviteUsers,
  listEvents,
  getEventDetails,
  updateEvent,
} = require("../controllers/event-controller");


// All event routes require auth
router.post("/", auth, createEvent);
router.post("/:id/invite", auth, inviteUsers);
router.get("/", auth, listEvents);
router.get("/:id", auth, getEventDetails);
router.put("/:id", auth, updateEvent);

module.exports = router;
