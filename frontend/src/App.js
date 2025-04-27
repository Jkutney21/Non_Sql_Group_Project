import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import api from './api';
import Layout from './components/Layout';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import ErrorPage from './pages/Errorpage';
import Register from './pages/Register';
import CourseList from './pages/CourseList';
import CourseDetails from './pages/CourseDetails';
import ProgramList from './pages/ProgramList';
import ProgramDetails from './pages/ProgramDetails';
import LevelsPage from './pages/LevelsPage';
import ProfessorList from './pages/ProfessorList';
import FinancialAidPage from './pages/FinancialAidPage';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (!token) {
      setValid(false);
      setChecking(false);
      return;
    }

    api.get('/api/auth/validate', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setValid(true))
      .catch(() => {
        localStorage.removeItem('token');
        setValid(false);
      })
      .finally(() => setChecking(false));
  }, [token]);

  if (checking) return <div>Checking authentication…</div>;

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Only one Home route, passing onLogin */}
          <Route path="/" element={<Home onLogin={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/student"
            element={valid ? <StudentDashboard /> : <Navigate to="/" replace />}
          />
          <Route
            path="/staff"
            element={valid ? <StaffDashboard /> : <Navigate to="/" replace />}
          />
          <Route
            path="/courses"
            element={valid ? <CourseList /> : <Navigate to="/" replace />}
          />
          <Route
            path="/courses/:id"
            element={valid ? <CourseDetails /> : <Navigate to="/" replace />}
          />
          <Route
            path="/programs"
            element={valid ? <ProgramList /> : <Navigate to="/" replace />}
          />
          <Route
            path="/programs/:id"
            element={valid ? <ProgramDetails /> : <Navigate to="/" replace />}
          />
          <Route
            path="/levels"
            element={valid ? <LevelsPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/professors"
            element={valid ? <ProfessorList /> : <Navigate to="/" replace />}
          />
          <Route
            path="/financial-aid"
            element={valid ? <FinancialAidPage /> : <Navigate to="/" replace />}
          />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;