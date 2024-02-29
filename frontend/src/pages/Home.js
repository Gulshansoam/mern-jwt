import React, { useEffect } from "react";
import WorkoutDetailComponent from "../components/WorkoutDetailComponent";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();
      if (response.ok) dispatch({ type: "SET_WORKOUTS", payload: json });
    };
    fetchWorkout();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts?.map((workout) => (
            <WorkoutDetailComponent workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
