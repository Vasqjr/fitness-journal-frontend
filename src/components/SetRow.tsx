import { useState } from 'react';
import type { WorkoutSet } from '../types';
import { useMetricPreference, displayWeight, toKg } from '../utils/units';

interface Props {
    set: WorkoutSet;
    workoutId: string;
    onDelete: () => void;
    onUpdate: (setId: string, data: { reps?: number; weightKg?: number; rpe?: number; notes?: string }) => void;
}

export default function SetRow({ set, workoutId, onDelete, onUpdate }: Props) {
    const useMetric = useMetricPreference();
    const [editing, setEditing] = useState(false);
    const [reps, setReps] = useState(set.reps?.toString() || '');
    const [weightKg, setWeightKg] = useState(
        set.weightKg ? (useMetric ? set.weightKg.toString() : (Math.round(set.weightKg * 2.20462 * 10) / 10).toString()) : ''
    );
    const [rpe, setRpe] = useState(set.rpe?.toString() || '');
    const [notes, setNotes] = useState(set.notes || '');



    const handleSave = () => {
        const weightValue = weightKg ? parseFloat(weightKg) : undefined;
        onUpdate(set.id, {
            reps: reps ? parseInt(reps) : undefined,
            weightKg: weightValue !== undefined ? toKg(weightValue, useMetric) : undefined,
            rpe: rpe ? parseFloat(rpe) : undefined,
            notes: notes || undefined,
        });
        setEditing(false);
    };

    

    if (editing) {
        return (
            <div style={{
                padding: '10px 12px',
                borderBottom: '1px solid #eee',
                backgroundColor: '#f9fafb'
            }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>
                    {set.exerciseName} — Set {set.setNumber}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <input
                        placeholder="Reps"
                        value={reps}
                        onChange={e => setReps(e.target.value)}
                        style={{ padding: '4px 8px', width: 70, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                    <input
                        placeholder={useMetric ? 'Weight (kg)' : 'Weight (lbs)'}
                        value={weightKg}
                        onChange={e => setWeightKg(e.target.value)}
                        style={{ padding: '4px 8px', width: 100, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                    <input
                        placeholder="RPE"
                        value={rpe}
                        onChange={e => setRpe(e.target.value)}
                        style={{ padding: '4px 8px', width: 60, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                    <input
                        placeholder="Notes"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        style={{ padding: '4px 8px', width: 150, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                    <button
                        onClick={handleSave}
                        style={{ padding: '4px 12px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setEditing(false)}
                        style={{ padding: '4px 12px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            borderBottom: '1px solid #eee',
            fontSize: 14
        }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <span style={{ fontWeight: 500, minWidth: 120 }}>{set.exerciseName}</span>
                <span style={{ color: '#666' }}>Set {set.setNumber}</span>
                {set.reps && <span>{set.reps} reps</span>}
                {set.weightKg && <span>@ {displayWeight(set.weightKg, useMetric)}</span>}
                {set.rpe && <span style={{ color: '#888' }}>RPE {set.rpe}</span>}
                {set.notes && <span style={{ color: '#888', fontStyle: 'italic' }}>{set.notes}</span>}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                <button
                    onClick={() => setEditing(true)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 14 }}
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: 16 }}
                >
                    ✕
                </button>
            </div>
        </div>
    );
}