import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, Button, Stack, Typography } from '@mui/material';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const theme = createTheme({
  palette: {
    background: { default: '#f4f6f8' },
    primary: { main: '#1976d2' }
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Typography variant="h4">MFE Auth (Standalone)</Typography>
              <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                <Button variant="contained" component={Link} to="/login">Login</Button>
                <Button variant="outlined" component={Link} to="/register">Cadastro</Button>
              </Stack>
            </Box>
          } />
          <Route path="/login" element={<LoginForm onLogin={() => alert('Login Shell!')} />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}