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
  const [mode, setMode] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );
  const theme = useMemo(() => buildTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  };

  const handleLogin = (token: string) => {
    localStorage.setItem('token', token);
    window.location.href = '/';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div data-theme={mode} data-testid="app-container">
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
