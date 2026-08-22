import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useMetricPreference, setMetricPreference } from '../utils/units';

export default function Navbar() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) =>
        location.pathname.startsWith(path)
            ? { borderBottom: '2px solid #ac63f1', color: '#ac63f1' }
            : { borderBottom: '2px solid transparent', color: '#555' };

    const [useMetric, setUseMetric] = useState(useMetricPreference());

    const toggleUnit = () => {
        const newValue = !useMetric;
        setUseMetric(newValue);
        setMetricPreference(newValue);
        window.location.reload(); // reload so all components pick up the change
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 24px',
            height: 56,
            backgroundColor: '#fff',
            borderBottom: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                <span
                    onClick={() => navigate('/workouts')}
                    style={{ fontWeight: 700, fontSize: 18, cursor: 'pointer', color: '#ac63f1' }}
                >
                    FitJournal
                </span>
                <div style={{ display: 'flex', gap: 24 }}>
                    <span
                        onClick={() => navigate('/workouts')}
                        style={{
                            cursor: 'pointer',
                            padding: '16px 0',
                            fontSize: 14,
                            fontWeight: 500,
                            ...isActive('/workouts')
                        }}
                    >
                        Workouts
                    </span>
                    <span
                        onClick={() => navigate('/progress')}
                        style={{
                            cursor: 'pointer',
                            padding: '16px 0',
                            fontSize: 14,
                            fontWeight: 500,
                            ...isActive('/progress')
                        }}
                    >
                        Progress
                    </span>
                    <span
                        onClick={() => navigate('/exercises')}
                        style={{
                            cursor: 'pointer',
                            padding: '16px 0',
                            fontSize: 14,
                            fontWeight: 500,
                            ...isActive('/exercises')
                        }}
                    >
                        Exercises
                    </span>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 14, color: '#666' }}>
                    {user?.displayName}
                </span>
                <button
                    onClick={toggleUnit}
                    style={{
                        padding: '6px 14px',
                        borderRadius: 6,
                        border: '1px solid #e5e7eb',
                        background: '#fff',
                        cursor: 'pointer',
                        fontSize: 14,
                        color: '#555'
                    }}
                >
                    {useMetric ? 'Switch to lbs' : 'Switch to kg'}
                </button>
                <button
                    onClick={logout}
                    style={{
                        padding: '6px 14px',
                        borderRadius: 6,
                        border: '1px solid #e5e7eb',
                        background: '#fff',
                        cursor: 'pointer',
                        fontSize: 14,
                        color: '#555'
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}