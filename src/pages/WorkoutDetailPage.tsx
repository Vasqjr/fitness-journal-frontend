import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkout, addSet, deleteSet, deleteWorkout } from '../api/workoutApi';
import { getExercises } from '../api/exerciseApi';
import type { Workout, Exercise } from '../types';

export default function WorkoutDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseId, setExerciseId] = useState('');
  const [reps, setReps] = useState('');
  const [weightKg, setWeightKg] = useState('');

  useEffect(() => {
    if (!id) return;
    getWorkout(id).then(res => setWorkout(res.data));
    getExercises().then(res => {
      setExercises(res.data);
      if (res.data.length > 0) setExerciseId(res.data[0].id);
    });
  }, [id]);

  const handleAddSet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !workout) return;
    const setNumber = workout.sets.length + 1;
    await addSet(id, {
      exerciseId,
      setNumber,
      reps: reps ? parseInt(reps) : undefined,
      weightKg: weightKg ? parseFloat(weightKg) : undefined,
    });
    const res = await getWorkout(id);
    setWorkout(res.data);
    setReps('');
    setWeightKg('');
  };

  const handleDeleteSet = async (setId: string) => {
    if (!id) return;
    await deleteSet(id, setId);
    const res = await getWorkout(id);
    setWorkout(res.data);
  };

  const handleDeleteWorkout = async () => {
    if (!id) return;
    await deleteWorkout(id);
    navigate('/workouts');
  };

  if (!workout) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={() => navigate('/workouts')}>← Back</button>
      <div>
        <h1>{workout.name}</h1>
        <button onClick={handleDeleteWorkout} style={{ color: 'red' }}>Delete Workout</button>
      </div>
      <p>{workout.date}</p>

      <h2>Sets</h2>
      {workout.sets.length === 0 ? (
        <p>No sets yet.</p>
      ) : (
        workout.sets.map(set => (
          <div key={set.id}>
            <span>{set.exerciseName} — {set.reps} reps @ {set.weightKg}kg</span>
            <button onClick={() => handleDeleteSet(set.id)}>✕</button>
          </div>
        ))
      )}

      <h2>Add Set</h2>
      <form onSubmit={handleAddSet}>
        <select
          value={exerciseId}
          onChange={e => setExerciseId(e.target.value)}
        >
          {exercises.map(ex => (
            <option key={ex.id} value={ex.id}>{ex.name}</option>
          ))}
        </select>
        <input
          placeholder="Reps"
          value={reps}
          onChange={e => setReps(e.target.value)}
        />
        <input
          placeholder="Weight (kg)"
          value={weightKg}
          onChange={e => setWeightKg(e.target.value)}
        />
        <button type="submit">Add Set</button>
      </form>
    </div>
  );
}