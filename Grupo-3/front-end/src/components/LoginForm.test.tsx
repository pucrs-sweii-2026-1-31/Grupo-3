import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    expect(screen.getByRole('button', { name: /acessar/i })).toBeInTheDocument();
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
    } as Response);

    renderWithProviders(<LoginForm onLogin={onLogin} />);

    await userEvent.type(screen.getByLabelText(/e-mail/i), 'joao@email.com');
    await userEvent.type(screen.getByLabelText(/senha/i, { selector: 'input' }), 'senha123');
    await userEvent.click(screen.getByRole('button', { name: /acessar/i }));

    await waitFor(() => expect(onLogin).toHaveBeenCalledWith('jwt-token'));
    expect(localStorage.getItem('token')).toBe('jwt-token');
  });

  it('exibe erro quando login falha', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ status: 401, message: 'Credenciais invalidas' }),
    } as Response);

    renderWithProviders(<LoginForm />);

    await userEvent.type(screen.getByLabelText(/e-mail/i), 'joao@email.com');
    await userEvent.type(screen.getByLabelText(/senha/i, { selector: 'input' }), 'senha123');
    await userEvent.click(screen.getByRole('button', { name: /acessar/i }));

    await waitFor(() => expect(screen.getByText(/Credenciais invalidas/i)).toBeInTheDocument());
  });
});
