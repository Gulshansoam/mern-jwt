require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection successful!");
    app.listen(process.env.PORT, () => {
      console.log(`This server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
