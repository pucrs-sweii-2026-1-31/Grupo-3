import React from 'react';
import { screen } from '@testing-library/react';
import RegisterPage from './RegisterPage';
import { renderWithProviders } from '../test-utils';

describe('RegisterPage', () => {
  it('renderiza o titulo e o formulario de cadastro', () => {
    renderWithProviders(<RegisterPage />);
    expect(screen.getByRole('heading', { name: /criar conta/i })).toBeInTheDocument();
    expect(screen.getByText(/comece sua jornada/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /criar conta/i })).toBeInTheDocument();
  });
});
