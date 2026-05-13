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
  alpha,
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
  const [success, setSuccess] = useState(false);
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
      setSuccess(true);
      setTimeout(() => {
        onLogin?.(token);
      }, 1000);
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
        overflow: 'hidden',
        py: 4,
      }}
    >
      <div className="auth-background">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <Container maxWidth="sm">
        <style>
          {`
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              20%, 60% { transform: translateX(-8px); }
              40%, 80% { transform: translateX(8px); }
            }
            .shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
          `}
        </style>
        <Box
          className={`glass-card fade-in-up ${error ? 'shake' : ''}`}
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 6,
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
                height: 4,
                bgcolor: 'transparent',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                }
              }}
            />
          )}

          <Stack spacing={4}>
            {/* Brand Header */}
            <Stack spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  boxShadow: '0 12px 30px rgba(59,130,246,0.4)',
                  mb: 1.5,
                  transform: 'rotate(-5deg)',
                }}
              >
                <SecurityIcon sx={{ color: '#fff', fontSize: 32 }} />
              </Box>
              <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: '-0.04em' }}>
                Chave <span style={{ opacity: 0.5 }}>Portal</span>
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ maxWidth: 300, fontWeight: 500 }}>
                Acesse o sistema de autoavaliação de competências de forma segura.
              </Typography>
            </Stack>

            <Divider>
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Credenciais
              </Typography>
            </Divider>

            <Box component="form" onSubmit={handleSubmit} id="login-form">
              <Stack spacing={3}>
                {error && (
                  <Alert
                    severity="error"
                    variant="filled"
                    sx={{ 
                      borderRadius: 3,
                      background: 'linear-gradient(90deg, #ef4444, #dc2626)',
                      boxShadow: '0 4px 12px rgba(239,68,68,0.2)'
                    }}
                  >
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert 
                    icon={<SecurityIcon />}
                    severity="success" 
                    variant="filled"
                    sx={{ 
                      borderRadius: 3, 
                      fontWeight: 700, 
                      animation: 'fadeInUp 0.5s ease',
                      background: 'linear-gradient(90deg, #10b981, #059669)',
                      boxShadow: '0 4px 12px rgba(16,185,129,0.2)'
                    }}
                  >
                    Acesso autorizado! Redirecionando...
                  </Alert>
                )}

                <TextField
                  id="login-email"
                  label="E-mail"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  variant="outlined"
                  onChange={handleChange}
                  value={credentials.email}
                  placeholder="exemplo@email.com"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ color: 'primary.main', fontSize: 22, mr: 0.5 }} />
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
                  placeholder="Sua senha secreta"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: 'primary.main', fontSize: 22, mr: 0.5 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                          aria-label={showPassword ? "ocultar senha" : "mostrar senha"}
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
                    py: 1.8,
                    fontSize: '1rem',
                    fontWeight: 800,
                    borderRadius: 3,
                    boxShadow: '0 12px 24px -6px rgba(59,130,246,0.5)',
                  }}
                >
                  {loading ? 'Validando...' : 'Entrar no Sistema'}
                </Button>
              </Stack>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Ainda não tem acesso?{' '}
                <Typography
                  variant="body2"
                  component="a"
                  href="/register"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 800,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Criar minha conta
                </Typography>
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
          display="block"
          sx={{ mt: 4, opacity: 0.5, fontWeight: 600, letterSpacing: '0.05em' }}
        >
          SISTEMA PROTEGIDO · PUCRS GRUPO 3 · 2026
        </Typography>
      </Container>
    </Box>
  );
}
