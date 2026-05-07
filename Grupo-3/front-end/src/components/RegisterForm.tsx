'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Cadastro:', { email, password });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 10, p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" size="large">
              Cadastrar
            </Button>
            <Link href="/login" passHref>
              <Button component="a" variant="text">
                Já tenho conta
              </Button>
            </Link>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
