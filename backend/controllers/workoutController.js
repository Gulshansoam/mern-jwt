const { default: mongoose } = require("mongoose");
const Workout = require("../models/modelWorkout");

// get all workouts
const getAllWorkouts = async (req, res) => {
  const allWorkouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(allWorkouts);
};

// get a single workout
const getOneWorkOut = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Workout" });
  }
  const singleWorkout = await Workout.findById(id);
  if (!singleWorkout) {
    return res.status(404).json({ error: "No such Workout" });
  }
  res.status(200).json(singleWorkout);
};

// create new workout

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  const emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!reps) emptyFields.push("reps");
  if (!load) emptyFields.push("load");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "All fields are required", emptyFields });
  }
  try {
    const newWorkOut = await Workout.create({ title, reps, load });
    res.status(200).json(newWorkOut);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Wprkout" });
  }
  const deletedWorkout = await Workout.findOneAndDelete({ _id: id });
  if (!deletedWorkout) {
    return res.status(404).json({ error: "No such Workout" });
  }
  res.status(200).json(deletedWorkout);
};

// update a workout
const UpdateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send({ error: "NO such workout" });
  }
  const updatedWorkout = await Workout.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );
  if (!updatedWorkout) {
    res.status(404).send({ error: "NO such workout" });
  }
  res.status(200).json(updatedWorkout);
};

module.exports = {
  createWorkout,
  getOneWorkOut,
  getAllWorkouts,
  deleteWorkout,
  UpdateWorkout,
};
