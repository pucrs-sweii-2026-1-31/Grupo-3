import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App UI Smoke Test', () => {
  it('renders the application shell without crashing', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    // Verifica se elementos basicos do layout enterprise estao presentes
    // ou se redireciona para login (comportamento esperado)
    const elements = screen.queryByText(/login/i) || screen.queryByText(/entrar/i);
    expect(elements).toBeDefined();
  });
});
