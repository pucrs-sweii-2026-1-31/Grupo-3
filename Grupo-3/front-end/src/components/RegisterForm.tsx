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
                  background: 'linear-gradient(90deg, #10b981, #06b6d4)',
                }
              }}
            />
          )}

          <Stack spacing={4}>
            {/* Header */}
            <Stack spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                  boxShadow: '0 12px 30px rgba(16,185,129,0.4)',
                  mb: 1.5,
                  transform: 'rotate(5deg)',
                }}
              >
                <HowToRegIcon sx={{ color: '#fff', fontSize: 32 }} />
              </Box>
              <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: '-0.04em' }}>
                Novo <span style={{ opacity: 0.5 }}>Acesso</span>
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ fontWeight: 500 }}>
                Crie sua conta para iniciar sua jornada na plataforma.
              </Typography>
            </Stack>

            <Divider>
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Dados Pessoais
              </Typography>
            </Divider>

            {success && (
              <Alert
                severity="success"
                variant="filled"
                icon={<CheckCircleOutlineIcon />}
                sx={{ 
                  borderRadius: 3,
                  background: 'linear-gradient(90deg, #10b981, #059669)',
                  boxShadow: '0 8px 20px rgba(16,185,129,0.2)'
                }}
                className="fade-in-up"
              >
                <Stack spacing={1}>
                  <Typography fontWeight={700}>{success}</Typography>
                  <Button
                    href="/login"
                    variant="outlined"
                    size="small"
                    sx={{
                      color: '#fff',
                      borderColor: 'rgba(255,255,255,0.5)',
                      fontWeight: 800,
                      '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
                      alignSelf: 'flex-start',
                    }}
                  >
                    Fazer Login Agora
                  </Button>
                </Stack>
              </Alert>
            )}

            {!success && (
              <Box component="form" onSubmit={handleSubmit} id="register-form">
                <Stack spacing={3}>
                  {error && (
                    <Alert
                      severity="error"
                      variant="filled"
                      sx={{ borderRadius: 3 }}
                    >
                      {error}
                    </Alert>
                  )}

                  <TextField
                    id="register-name"
                    label="Nome Completo"
                    name="userName"
                    fullWidth
                    required
                    onChange={handleChange}
                    value={form.userName}
                    placeholder="Como deseja ser chamado?"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon sx={{ color: 'secondary.main', fontSize: 22, mr: 0.5 }} />
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
                    placeholder="exemplo@email.com"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon sx={{ color: 'secondary.main', fontSize: 22, mr: 0.5 }} />
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
                    placeholder="Segurança mínima 6 chars"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: 'secondary.main', fontSize: 22, mr: 0.5 }} />
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
                    id="register-submit"
                    variant="contained"
                    color="secondary"
                    type="submit"
                    size="large"
                    fullWidth
                    disabled={loading}
                    sx={{
                      py: 1.8,
                      fontSize: '1rem',
                      fontWeight: 800,
                      borderRadius: 3,
                      boxShadow: '0 12px 24px -6px rgba(16,185,129,0.5)',
                    }}
                  >
                    {loading ? 'Processando...' : 'Finalizar Cadastro'}
                  </Button>
                </Stack>
              </Box>
            )}

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Já faz parte da plataforma?{' '}
                <Typography
                  variant="body2"
                  component="a"
                  href="/login"
                  sx={{
                    color: 'secondary.main',
                    fontWeight: 800,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Entrar aqui
                </Typography>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
