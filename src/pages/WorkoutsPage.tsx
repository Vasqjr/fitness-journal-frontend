import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWorkouts, createWorkout } from '../api/workoutApi';
import { useAuth } from '../context/AuthContext';
import type { Workout } from '../types';

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getWorkouts().then(res => {
      setWorkouts(res.data.content);
      setLoading(false);
    });
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createWorkout({ name, date });
    navigate(`/workouts/${res.data.id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <h1>My Workouts</h1>
        <div>
          <span>Hi, {user?.displayName}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <button onClick={() => setShowForm(!showForm)}>
        + New Workout
      </button>

      {showForm && (
        <form onSubmit={handleCreate}>
          <input
            placeholder="Workout name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
      )}

      {workouts.length === 0 ? (
        <p>No workouts yet. Create your first one!</p>
      ) : (
        workouts.map(workout => (
          <div
            key={workout.id}
            onClick={() => navigate(`/workouts/${workout.id}`)}
          >
            <h3 >{workout.name}</h3>
            <p>{workout.date} · {workout.sets.length} sets</p>
          </div>
        ))
      )}
    </div>
  );
}