import Link from 'next/link';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <main>
      <Container maxWidth="sm">
        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Microfront-end de Usuário
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Sistema de autenticação com login e cadastro usando Next.js, Module Federation e Material UI.
          </Typography>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button component={Link} href="/login" variant="contained">
              Entrar
            </Button>
            <Button component={Link} href="/register" variant="outlined">
              Cadastrar
            </Button>
          </Stack>
        </Box>
      </Container>
    </main>
  );
}
