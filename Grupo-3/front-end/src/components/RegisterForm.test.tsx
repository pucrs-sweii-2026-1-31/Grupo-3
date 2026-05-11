import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';
import { renderWithProviders } from '../test-utils';

describe('RegisterForm', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renderiza campos principais', () => {
    renderWithProviders(<RegisterForm />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  it('realiza cadastro e exibe sucesso', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Usuario registrado com sucesso',
        data: { id: 1, userName: 'joao', email: 'joao@email.com' },
      }),
    } as Response);

    renderWithProviders(<RegisterForm />);

    await userEvent.type(screen.getByLabelText(/nome/i), 'joao');
    await userEvent.type(screen.getByLabelText(/e-mail/i), 'joao@email.com');
    await userEvent.type(screen.getByLabelText(/senha/i), 'senha123');
    await userEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => expect(screen.getByText(/Cadastro realizado com sucesso/i)).toBeInTheDocument());
  });

  it('exibe erro quando cadastro falha', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ status: 400, message: 'Email ja cadastrado' }),
    } as Response);

    renderWithProviders(<RegisterForm />);

    await userEvent.type(screen.getByLabelText(/nome/i), 'João');
    await userEvent.type(screen.getByLabelText(/e-mail/i), 'joao@email.com');
    await userEvent.type(screen.getByLabelText(/senha/i), 'senha123');
    await userEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => expect(screen.getByText(/Email ja cadastrado/i)).toBeInTheDocument());
  });
});
