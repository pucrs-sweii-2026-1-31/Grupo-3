import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Stack, Container } from '@mui/material';
import { RegisterCredentials } from '../models/auth';

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterCredentials>({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
          Chave - Cadastro
        </Typography>
        <Box component="form">
          <Stack spacing={2}>
            <TextField label="Nome" name="name" fullWidth required onChange={handleChange} />
            <TextField label="E-mail" name="email" type="email" fullWidth required onChange={handleChange} />
            <TextField label="Senha" name="password" type="password" fullWidth required onChange={handleChange} />
            <Button variant="contained" color="secondary" size="large" fullWidth sx={{ mt: 2 }}>
              Cadastrar
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}