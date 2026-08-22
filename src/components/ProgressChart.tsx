import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ProgressPoint } from '../types';

interface Props {
  data: ProgressPoint[];
}

export default function ProgressChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div style={{
        padding: 40,
        textAlign: 'center',
        color: '#888',
        border: '1px dashed #ccc',
        borderRadius: 8
      }}>
        No data yet for this exercise. Log some sets to see your progress!
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="maxWeightKg"
          stroke="#6366f1"
          name="Max Weight (kg)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="totalVolume"
          stroke="#10b981"
          name="Total Volume"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}