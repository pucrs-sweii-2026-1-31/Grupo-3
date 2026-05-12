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
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { RegisterCredentials } from '../models/auth';
import { ApiClientError } from '../types/api';
import { useAuth } from '../hooks/useAuth';

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterCredentials>({ userName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await auth.register(form);
      setSuccess('Cadastro realizado com sucesso! Você já pode acessar sua conta.');
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Não foi possível realizar o cadastro. Tente novamente.');
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
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
                mb: 1,
              }}
            >
              <HowToRegIcon sx={{ color: '#fff', fontSize: 28 }} />
            </Box>
            <Typography variant="h4" fontWeight={800} sx={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Criar Conta
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Comece sua jornada de autoavaliação
            </Typography>
          </Stack>

          <Divider sx={{ mb: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
              Preencha seus dados
            </Typography>
          </Divider>

          {/* Success state */}
          {success && (
            <Alert
              severity="success"
              variant="filled"
              icon={<CheckCircleOutlineIcon />}
              sx={{ borderRadius: 2, mb: 2 }}
              className="fade-in-up"
            >
              <Stack spacing={1}>
                <Typography fontWeight={600}>{success}</Typography>
                <Button
                  href="/login"
                  variant="outlined"
                  size="small"
                  sx={{
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
                    alignSelf: 'flex-start',
                  }}
                >
                  Ir para Login
                </Button>
              </Stack>
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} id="register-form">
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
                id="register-name"
                label="Nome completo"
                name="userName"
                fullWidth
                required
                onChange={handleChange}
                value={form.userName}
                placeholder="Seu nome"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                id="register-email"
                label="E-mail"
                name="email"
                type="email"
                fullWidth
                required
                onChange={handleChange}
                value={form.email}
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
                id="register-password"
                label="Senha"
                name="password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                onChange={handleChange}
                value={form.password}
                placeholder="Mínimo 6 caracteres"
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
                id="register-submit"
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
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                    boxShadow: '0 8px 24px rgba(16,185,129,0.35)',
                  },
                }}
              >
                {loading ? 'Cadastrando...' : 'Criar Conta'}
              </Button>
            </Stack>
          </Box>

          {/* Footer */}
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5} sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Já tem conta?
            </Typography>
            <Typography
              variant="body2"
              component="a"
              href="/login"
              sx={{
                color: 'secondary.main',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Faça login
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
