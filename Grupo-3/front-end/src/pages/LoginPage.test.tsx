import React from 'react';
import { screen } from '@testing-library/react';
import LoginPage from './LoginPage';
import { renderWithProviders } from '../test-utils';

describe('LoginPage', () => {
  it('renderiza o titulo e o formulario de login', () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByText('Chave')).toBeInTheDocument();
    expect(screen.getByText(/Autoavaliação de Competências/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /acessar/i })).toBeInTheDocument();
  });
});
