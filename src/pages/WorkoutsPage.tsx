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
    <div id="workout-page-wrapper">
      <button onClick={logout} className="logout-button">Logout</button>
      <div className="training-log-content">
        <h1>Training Log</h1>


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
            <div className='workout-info-wrapper'>
              <div className='workout-date'>{workout.date}</div>
              <div
                className="workout-info"
                key={workout.id}
                onClick={() => navigate(`/workouts/${workout.id}`)}
              >
                <div className='workout-name'>{workout.name}</div>
                <div>{workout.sets.length} sets</div>
                <div>{workout.notes}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}