'use client';

import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Paper, 
  Stack, 
  TextField, 
  Typography 
} from '@mui/material';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // A lógica de integração com o back (authService) pode ser adicionada aqui depois
    console.log('Login:', { email, password });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 10, p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom className="font-bold">
          Login
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
              required
              fullWidth
              autoComplete="email"
            />
            
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              value={password}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
              required
              fullWidth
              autoComplete="current-password"
            />

            <Button 
              type="submit" 
              variant="contained" 
              size="large" 
              fullWidth
              sx={{ py: 1.5, mt: 1 }}
            >
              Entrar
            </Button>

            <Button 
              component={Link} 
              href="/register" 
              variant="text" 
              fullWidth
            >
              Ainda não tenho conta
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}