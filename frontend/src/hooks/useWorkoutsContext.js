import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";
export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error(
      "useWorkoutsContext must be used inside an workoutContextProvider"
    );
  }
  return context;
};
