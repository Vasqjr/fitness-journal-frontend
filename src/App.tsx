import React, { useEffect, useState } from 'react';
import { getWorkout } from './userService';
import './App.css'

function App() {
  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getWorkout(1); // Fetching workout ID 1
      console.log(data);
      setWorkouts(data);
    };
    loadData();
  }, []);

  return (
    <div>
      <h1>Workouts</h1>
      {workouts.map((workout) => (
        <div key={workout.id}>
          <h3>{workout.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default App
