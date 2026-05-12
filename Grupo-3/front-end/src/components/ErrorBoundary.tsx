import React, { Component } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 300,
            p: 4,
          }}
        >
          <Stack spacing={2} alignItems="center" textAlign="center">
            <ErrorOutlineIcon sx={{ fontSize: 48, color: 'error.main', opacity: 0.7 }} />
            <Typography variant="h6" fontWeight={600}>
              Módulo indisponível
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 400 }}>
              Não foi possível carregar o componente solicitado. Verifique se o microfrontend está rodando.
            </Typography>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={this.handleRetry}
              sx={{ mt: 1 }}
            >
              Tentar novamente
            </Button>
          </Stack>
        </Box>
      );
    }

    return this.props.children;
  }
}
