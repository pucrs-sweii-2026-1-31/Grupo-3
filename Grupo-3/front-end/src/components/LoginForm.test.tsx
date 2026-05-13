import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginForm from './LoginForm';
import { renderWithProviders } from '../test-utils';

describe('LoginForm', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renderiza campos principais', () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar no Sistema/i })).toBeInTheDocument();
  });

  it('realiza login, armazena token e chama callback', async () => {
    const onLogin = vi.fn();
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Login realizado com sucesso',
        data: { token: 'jwt-token' },
      }),
    } as unknown as Response);

    renderWithProviders(<LoginForm onLogin={onLogin} />);

    await userEvent.type(screen.getByLabelText(/e-mail/i), 'joao@email.com');
    await userEvent.type(screen.getByLabelText(/senha/i, { selector: 'input' }), 'senha123');
    await userEvent.click(screen.getByRole('button', { name: /Entrar no Sistema/i }));

    await waitFor(() => expect(onLogin).toHaveBeenCalledWith('jwt-token'), { timeout: 2000 });
    expect(localStorage.getItem('token')).toBe('jwt-token');
  });

  it('exibe erro quando login falha', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ status: 401, message: 'Credenciais invalidas' }),
    } as unknown as Response);

    renderWithProviders(<LoginForm />);

    await userEvent.type(screen.getByLabelText(/e-mail/i), 'joao@email.com');
    await userEvent.type(screen.getByLabelText(/senha/i, { selector: 'input' }), 'senha123');
    await userEvent.click(screen.getByRole('button', { name: /Entrar no Sistema/i }));

    await waitFor(() => expect(screen.getByText(/Credenciais invalidas/i)).toBeInTheDocument());
  });

  it('exibe mensagem de erro generica em falha desconhecida', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Unknown'));

    renderWithProviders(<LoginForm />);

    await userEvent.type(screen.getByLabelText(/e-mail/i), 'joao@email.com');
    await userEvent.type(screen.getByLabelText(/senha/i, { selector: 'input' }), 'senha123');
    await userEvent.click(screen.getByRole('button', { name: /Entrar no Sistema/i }));

    expect(await screen.findByText(/Não foi possível realizar o login/i)).toBeInTheDocument();
  });

  it('alterna visibilidade da senha ao clicar no icone', async () => {
    renderWithProviders(<LoginForm />);
    const passwordInput = screen.getByLabelText(/senha/i, { selector: 'input' });
    const toggleBtn = screen.getByLabelText(/mostrar senha/i);

    expect(passwordInput).toHaveAttribute('type', 'password');
    await userEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    await userEvent.click(screen.getByLabelText(/ocultar senha/i));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
