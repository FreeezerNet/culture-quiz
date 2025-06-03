import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import StartQuizPage from './pages/StartQuizPage';
import CategoriesPage from './pages/CategoriesPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import Header from './components/Header';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erreur capturée :', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Oups ! Quelque chose s'est mal passé.
            </h2>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = '/auth';
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              Retourner à la page de connexion
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        <Routes>
          <Route
            path="/auth"
            element={isAuthenticated ? <Navigate to="/start" /> : <AuthPage />}
          />
          <Route
            path="/start"
            element={
              <PrivateRoute>
                <StartQuizPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <CategoriesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/quiz/:categoryId"
            element={
              <PrivateRoute>
                <QuizPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/results"
            element={
              <PrivateRoute>
                <ResultsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/start" : "/auth"} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
    <AuthProvider>
      <Router>
          <AppContent />
      </Router>
    </AuthProvider>
    </ErrorBoundary>
  );
}
