import React, { useState } from 'react';
import { Alert, TextField, Button, Typography, Paper, Box, Stack, Container } from '@mui/material';
import { RegisterCredentials } from '../models/auth';
import { ApiClientError } from '../types/api';
import { useAuth } from '../hooks/useAuth';

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterCredentials>({ userName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
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
      setSuccess('Cadastro realizado com sucesso');
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Nao foi possivel realizar o cadastro');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
          Chave — Autoavaliação de Competências
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <TextField label="Nome" name="userName" fullWidth required onChange={handleChange} value={form.userName} />
            <TextField label="E-mail" name="email" type="email" fullWidth required onChange={handleChange} />
            <TextField label="Senha" name="password" type="password" fullWidth required onChange={handleChange} />
            <Button variant="contained" color="secondary" size="large" fullWidth sx={{ mt: 2 }} type="submit" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
