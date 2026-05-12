import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthProvider } from './hooks/useAuth';

export function renderWithProviders(ui: React.ReactElement) {
  const theme = createTheme();

  return render(
    <ThemeProvider theme={theme}>
      <AuthProvider>{ui}</AuthProvider>
    </ThemeProvider>
  );
}
