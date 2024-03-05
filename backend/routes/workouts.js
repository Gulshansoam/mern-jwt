const express = require("express");
const router = express.Router();
const {
  createWorkout,
  getOneWorkOut,
  getAllWorkouts,
  deleteWorkout,
  UpdateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");
// require auth for all workout routes
router.use(requireAuth);

// get all workouts
router.get("/", getAllWorkouts);
//  get single workout
router.get("/:id", getOneWorkOut);
// POST workout
router.post("/", createWorkout);
// DELETE a workout
router.delete("/:id", deleteWorkout);
// UPDATE a workout
router.patch("/:id", UpdateWorkout);

module.exports = router;
