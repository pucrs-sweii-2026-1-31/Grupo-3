import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Stack, Container } from '@mui/material';
import { LoginCredentials } from '../models/auth';

interface LoginFormProps {
  onLogin?: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login acionado no MFE:', credentials);
    // Integração com o Shell:
    if (onLogin) onLogin();
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
          Chave - Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField 
              label="E-mail" 
              name="email" 
              fullWidth 
              required
              onChange={handleChange} 
              value={credentials.email} 
            />
            <TextField 
              label="Senha" 
              name="password" 
              type="password" 
              fullWidth 
              required
              onChange={handleChange} 
              value={credentials.password} 
            />
            <Button variant="contained" type="submit" size="large" fullWidth sx={{ mt: 2 }}>
              Acessar
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}