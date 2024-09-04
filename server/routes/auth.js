const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  refreshAccessToken,
  dummyProtected,
  userDataHandler,
} = require("../controllers/auth");
const { isAuthorized } = require("../middlewares/isAuthorized");

// register
router.post("/register", registerUser);
// login
router.post("/login", loginUser);
// refresh-token
router.get("/refresh-accesstoken", refreshAccessToken);

// dummy protected routes
router.get("/protected", isAuthorized, dummyProtected);

module.exports = router;
