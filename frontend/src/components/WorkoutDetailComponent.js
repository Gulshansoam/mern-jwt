import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import fromatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetailComponent = (props) => {
  const { workout } = props;
  const { dispatch } = useWorkoutContext();

  const handleDelete = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (!response.ok) throw new Error("Workout Not Deleted");
    else dispatch({ type: "DELETE_WORKOUT", payload: json });
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load(in Kgs): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {fromatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        DELETE
      </span>
    </div>
  );
};

export default WorkoutDetailComponent;
