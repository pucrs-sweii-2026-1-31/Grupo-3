import { createTheme, type ThemeOptions } from '@mui/material';

const shared: ThemeOptions = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h3: { fontWeight: 800, letterSpacing: '-0.02em' },
    h4: { fontWeight: 700, letterSpacing: '-0.01em' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' as const },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          fontSize: '0.95rem',
          boxShadow: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'all 0.2s ease',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(59,130,246,0.08)',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(59,130,246,0.12)',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid',
        },
      },
    },
  },
};

export function buildTheme(mode: 'light' | 'dark') {
  return createTheme({
    ...shared,
    palette: {
      mode,
      primary: { main: '#3b82f6', light: '#60a5fa', dark: '#1d4ed8' },
      secondary: { main: '#10b981', light: '#34d399', dark: '#059669' },
      error: { main: '#ef4444' },
      warning: { main: '#f59e0b' },
      info: { main: '#06b6d4' },
      success: { main: '#10b981' },
      background: {
        default: mode === 'dark' ? '#0f172a' : '#f1f5f9',
        paper: mode === 'dark' ? '#1e293b' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#f1f5f9' : '#0f172a',
        secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
      },
      divider: mode === 'dark' ? 'rgba(148,163,184,0.12)' : 'rgba(15,23,42,0.08)',
    },
    components: {
      ...shared.components,
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid',
            borderColor: mode === 'dark' ? 'rgba(148,163,184,0.12)' : 'rgba(15,23,42,0.08)',
            backgroundColor: mode === 'dark' ? 'rgba(15,23,42,0.8)' : 'rgba(255,255,255,0.8)',
            color: mode === 'dark' ? '#f1f5f9' : '#0f172a',
          },
        },
      },
    },
  });
}

export const lightTheme = buildTheme('light');
export const darkTheme = buildTheme('dark');
