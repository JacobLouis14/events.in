require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

// routes specifiers
const userRoutes = require("./routes/users");
const eventsRoute = require("./routes/events");
const categoryRoutes = require("./routes/categories");
const authRoutes = require("./routes/auth");

// Database connection
require("./services/database");

const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

// route Handlers
app.use("/api/users", userRoutes);
app.use("/api/events", eventsRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
