import React, { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { buildTheme } from './theme/theme';
import { AuthProvider } from './hooks/useAuth';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import ShellLayout from './layouts/ShellLayout';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = useMemo(() => buildTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogin = (token: string) => {
    localStorage.setItem('token', token);
    window.location.href = '/';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div data-theme={mode}>
        <AuthProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <Routes>
                {/* Auth pages (full screen, no shell) */}
                <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                <Route path="/cadastro" element={<RegisterForm />} />
                <Route path="/register" element={<Navigate to="/cadastro" replace />} />

                {/* App pages (with shell layout) */}
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <ShellLayout mode={mode} onToggleMode={toggleMode}>
                        <Dashboard />
                      </ShellLayout>
                    </PrivateRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </ErrorBoundary>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}
