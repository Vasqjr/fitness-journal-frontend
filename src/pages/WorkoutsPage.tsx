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
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Workouts</h1>
        <div>
          <span style={{ marginRight: 16 }}>Hi, {user?.displayName}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: 16 }}>
        + New Workout
      </button>

      {showForm && (
        <form onSubmit={handleCreate} style={{ marginBottom: 24, padding: 16, border: '1px solid #ccc' }}>
          <input
            placeholder="Workout name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
          />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
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
            style={{ padding: 16, border: '1px solid #ccc', marginBottom: 8, cursor: 'pointer', borderRadius: 4 }}
          >
            <h3 style={{ margin: 0 }}>{workout.name}</h3>
            <p style={{ margin: 0, color: '#666' }}>{workout.date} · {workout.sets.length} sets</p>
          </div>
        ))
      )}
    </div>
  );
}