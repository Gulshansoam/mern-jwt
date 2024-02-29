import React, { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workoutPayload = { title, reps, load };
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workoutPayload),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      setEmptyFields(json.emptyFields);
      setError(json.error);
    } else {
      setTitle("");
      setReps("");
      setLoad("");
      setError(null);
      setEmptyFields([]);
      console.log("workout added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a Workout(Exercise)</h3>
      <label>Title/Exercise</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Reps</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <label>Load (in Kg)</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <button on>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
