import { useEffect, useState } from 'react';
import { getExercises } from '../api/exerciseApi';
import { getProgress } from '../api/progressApi';
import type { Exercise, ProgressPoint } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [data, setData] = useState<ProgressPoint[]>([]);

  useEffect(() => {
    getExercises().then(res => {
      setExercises(res.data);
      if (res.data.length > 0) setSelectedId(res.data[0].id);
    });
  }, []);

  useEffect(() => {
    if (selectedId) {
      getProgress(selectedId).then(res => setData(res.data));
    }
  }, [selectedId]);

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      <h1>Progress</h1>
      <select
        value={selectedId}
        onChange={e => setSelectedId(e.target.value)}
        style={{ marginBottom: 24, padding: 8 }}
      >
        {exercises.map(ex => (
          <option key={ex.id} value={ex.id}>{ex.name}</option>
        ))}
      </select>

      {data.length === 0 ? (
        <p>No data yet for this exercise.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="maxWeightKg" stroke="#8884d8" name="Max Weight (kg)" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}