import React from 'react';
import { screen } from '@testing-library/react';
import RegisterPage from './RegisterPage';
import { renderWithProviders } from '../test-utils';

describe('RegisterPage', () => {
  it('renderiza o titulo e o formulario de cadastro', () => {
    renderWithProviders(<RegisterPage />);
    expect(screen.getByText('Chave — Autoavaliação de Competências')).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });
});
