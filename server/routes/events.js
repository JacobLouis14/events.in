const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addEvent,
  deleteEvent,
  getAllEvents,
  getSpecificEvent,
  filterEvents,
} = require("../controllers/events");
const { isAuthorized } = require("../middlewares/isAuthorized");

const upload = multer({ storage: multer.memoryStorage() });

// create
router.post(
  "/add-event",
  isAuthorized,
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  addEvent
);
// delete
router.delete("/delete-event/:id", isAuthorized, deleteEvent);

// all events
router.get("/get-allevents", getAllEvents);

// get specific events
router.get("/getspecific-event/:id", getSpecificEvent);

// get filtered events
router.get("/get-filteredevents", filterEvents);

module.exports = router;
