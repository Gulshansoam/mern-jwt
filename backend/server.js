require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
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

mongoose
  .connect("mongodb://localhost:27017/mern-crud?retryWrites=true&w=majority", {
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
