const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoute");
const errorHandler = require("./utils/errorHandler");
const config = require("./config/config");
const cors = require("cors");
dotenv.config();
const app = express();
// cors
app.use(cors());

// Middleware
app.use(express.json());
// app.use(session({
//   secret: 'usmael',
//   resave: false,
//   saveUninitialized: false,
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

// Error handler
app.use(errorHandler);

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));
