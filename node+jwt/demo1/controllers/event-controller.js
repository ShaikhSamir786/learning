// controllers/eventController.js
const Event = require("../models/eventmodels");
const User = require("../models/authmodels");



// ✅ 1. Create Event
const createEvent = async (req, res) => {
  try {
    const { title, description, location, startDate, endDate, invitedEmails } =
      req.body;

    if (!title || !startDate || !endDate) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const event = await Event.create({
      title,
      description,
      location,
      startDate,
      endDate,
      creator: req.user._id,
      invitedEmails: invitedEmails?.map((e) => e.toLowerCase()) || [],
    });

    return res.status(201).json({ message: "Event created", event });
  } catch (error) {
    return res.status(500).json({ message: "Error creating event", error });
  }
};

// ✅ 2. Invite Users
const inviteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { emails } = req.body;

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Only creator can invite
    if (event.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const newEmails = emails.map((e) => e.toLowerCase());
    const merged = Array.from(new Set([...event.invitedEmails, ...newEmails]));

    event.invitedEmails = merged;
    await event.save();

    return res.json({ message: "Users invited", invitedEmails: merged });
  } catch (error) {
    return res.status(500).json({ message: "Error inviting users", error });
  }
};

// ✅ 3. List Events (with filters, pagination, search)
const listEvents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "startDate",
      order = "asc",
      startDate,
      endDate,
      search,
    } = req.query;

    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    // Condition: events created by me OR invited to
    const conditions = {
      $or: [
        { creator: req.user._id },
        { invitedEmails: req.user.email.toLowerCase() },
      ],
    };

    // Optional: date filter
    if (startDate || endDate) {
      conditions.startDate = {};
      if (startDate) conditions.startDate.$gte = new Date(startDate);
      if (endDate) conditions.startDate.$lte = new Date(endDate);
    }

    // Optional: search filter
    if (search) {
      conditions.$or.push({ title: { $regex: search, $options: "i" } });
      conditions.$or.push({ description: { $regex: search, $options: "i" } });
    }

    const total = await Event.countDocuments(conditions);
    const events = await Event.find(conditions)
      .populate("creator", "firstName lastName email")
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));

    return res.json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      events,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching events", error });
  }
};

// ✅ 4. Event Details
const getEventDetails = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("creator", "firstName lastName email")
      .populate("invitedUsers", "firstName lastName email");

    if (!event) return res.status(404).json({ message: "Event not found" });

    // Access control: must be creator or invited
    const isAllowed =
      event.creator._id.toString() === req.user._id.toString() ||
      event.invitedEmails.includes(req.user.email.toLowerCase());

    if (!isAllowed)
      return res.status(403).json({ message: "Not authorized to view this" });

    return res.json({ event });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching event details" });
  }
};

// ✅ 5. Update Event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only creator can update" });
    }

    const updatableFields = [
      "title",
      "description",
      "location",
      "startDate",
      "endDate",
    ];
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        event[field] = req.body[field];
      }
    });

    await event.save();
    return res.json({ message: "Event updated", event });
  } catch (error) {
    return res.status(500).json({ message: "Error updating event", error });
  }
};


module.exports = {
  createEvent,
  inviteUsers,
  listEvents,
  getEventDetails,
  updateEvent,
};  