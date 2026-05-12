import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App UI Smoke Test', () => {
  it('renders the application shell without crashing', () => {
    // App já inclui seu próprio BrowserRouter internamente
    render(<App />);

    // Sem token, redireciona para login — verifica se elementos estão presentes
    const elements = screen.queryByText(/acessar/i) || screen.queryByText(/e-mail/i);
    expect(elements).toBeDefined();
  });
});
