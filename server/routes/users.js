const express = require("express");
const { isAuthorized } = require("../middlewares/isAuthorized");
const {
  userDataHandler,
  eventBookHandler,
  eventCancelHandler,
} = require("../controllers/users");
const router = express.Router();

// userData
router.get("/user-data", isAuthorized, userDataHandler);

// booking events
router.post("/book-event/:id", isAuthorized, eventBookHandler);

// cancel events
router.post("/cancel-event", isAuthorized, eventCancelHandler);

module.exports = router;
