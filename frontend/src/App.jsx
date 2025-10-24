/**
 * ProfilPro 5D - Main App Component
 * Handles routing and authentication state
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Questionnaire from './pages/Questionnaire';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Import components
import Loading from './components/common/Loading';

function App() {
  const { user, isLoading } = useAuthStore();
  const isAuthenticated = !!user;

  // Show loading screen while checking auth
  if (isLoading) {
    return <Loading fullscreen text="Chargement..." />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/profile" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/profile" /> : <Register />}
          />

          {/* Protected routes */}
          <Route
            path="/questionnaire"
            element={isAuthenticated ? <Questionnaire /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
