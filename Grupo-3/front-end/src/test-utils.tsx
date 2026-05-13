import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

export function renderWithProviders(
  ui: React.ReactElement,
  { mode = 'light' }: { mode?: 'light' | 'dark' } = {}
) {
  const theme = createTheme({ palette: { mode } });

  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>{ui}</AuthProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
}
