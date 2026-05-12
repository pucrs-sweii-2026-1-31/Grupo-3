import React, { useState } from 'react';
import {
  Alert,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Container,
  InputAdornment,
  IconButton,
  LinearProgress,
  Divider,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import SecurityIcon from '@mui/icons-material/Security';
import { LoginCredentials } from '../models/auth';
import { ApiClientError } from '../types/api';
import { useAuth } from '../hooks/useAuth';

interface LoginFormProps {
  onLogin?: (token: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = await auth.login(credentials);
      onLogin?.(token);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Não foi possível realizar o login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        py: 4,
      }}
    >
      {/* Animated background */}
      <div className="auth-background">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <Container maxWidth="sm">
        <Box
          className="glass-card fade-in-up"
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {loading && (
            <LinearProgress
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                borderRadius: '16px 16px 0 0',
              }}
            />
          )}

          {/* Logo / Brand */}
          <Stack spacing={1} alignItems="center" sx={{ mb: 4 }} className="fade-in-up fade-in-up-delay-1">
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                boxShadow: '0 8px 24px rgba(59,130,246,0.3)',
                mb: 1,
              }}
            >
              <SecurityIcon sx={{ color: '#fff', fontSize: 28 }} />
            </Box>
            <Typography variant="h4" fontWeight={800} sx={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Chave
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Autoavaliação de Competências para Pessoas Idosas
            </Typography>
          </Stack>

          <Divider sx={{ mb: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
              Acesse sua conta
            </Typography>
          </Divider>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} id="login-form">
            <Stack spacing={2.5}>
              {error && (
                <Alert
                  severity="error"
                  variant="filled"
                  sx={{ borderRadius: 2 }}
                  className="fade-in-up"
                >
                  {error}
                </Alert>
              )}

              <TextField
                id="login-email"
                label="E-mail"
                name="email"
                type="email"
                fullWidth
                required
                onChange={handleChange}
                value={credentials.email}
                placeholder="seu@email.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                id="login-password"
                label="Senha"
                name="password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                onChange={handleChange}
                value={credentials.password}
                placeholder="••••••••"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      >
                        {showPassword ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                id="login-submit"
                variant="contained"
                type="submit"
                size="large"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
                    boxShadow: '0 8px 24px rgba(59,130,246,0.35)',
                  },
                }}
              >
                {loading ? 'Acessando...' : 'Acessar Plataforma'}
              </Button>
            </Stack>
          </Box>

          {/* Footer */}
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5} sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Não tem conta?
            </Typography>
            <Typography
              variant="body2"
              component="a"
              href="/register"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Cadastre-se
            </Typography>
          </Stack>
        </Box>

        {/* Bottom branding */}
        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
          display="block"
          sx={{ mt: 3, opacity: 0.6 }}
        >
          © 2026 Chave · PUCRS · Engenharia de Software II
        </Typography>
      </Container>
    </Box>
  );
}
