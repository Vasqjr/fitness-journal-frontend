import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WorkoutsPage from './pages/WorkoutsPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';
import ProgressPage from './pages/ProgressPage';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/workouts" element={
            <ProtectedRoute><WorkoutsPage /></ProtectedRoute>
          } />
          <Route path="/workouts/:id" element={
            <ProtectedRoute><WorkoutDetailPage /></ProtectedRoute>
          } />
          <Route path="/progress" element={
            <ProtectedRoute><ProgressPage /></ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/workouts" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}