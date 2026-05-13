import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RegisterForm from './RegisterForm';
import { renderWithProviders } from '../test-utils';

describe('RegisterForm', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renderiza campos principais', () => {
    renderWithProviders(<RegisterForm />);

    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Finalizar Cadastro/i })).toBeInTheDocument();
  });

  it('realiza cadastro e exibe sucesso', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Usuario registrado com sucesso',
        data: { id: 1, userName: 'joao', email: 'joao@email.com' },
      }),
    } as unknown as Response);

    renderWithProviders(<RegisterForm />);

    await userEvent.type(screen.getByLabelText(/nome completo/i), 'joao');
    await userEvent.type(screen.getByLabelText(/e-mail/i), 'joao@email.com');
    await userEvent.type(screen.getByLabelText(/senha/i, { selector: 'input' }), 'senha123');
    await userEvent.click(screen.getByRole('button', { name: /Finalizar Cadastro/i }));

    await waitFor(() => expect(screen.getByText(/Cadastro realizado com sucesso/i)).toBeInTheDocument());
  });

  it('exibe erro quando cadastro falha', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ status: 400, message: 'Email ja cadastrado' }),
    } as unknown as Response);

    renderWithProviders(<RegisterForm />);

    await userEvent.type(screen.getByLabelText(/nome completo/i), 'João');
    await userEvent.type(screen.getByLabelText(/e-mail/i), 'joao@email.com');
    await userEvent.type(screen.getByLabelText(/senha/i, { selector: 'input' }), 'senha123');
    await userEvent.click(screen.getByRole('button', { name: /Finalizar Cadastro/i }));

    await waitFor(() => expect(screen.getByText(/Email ja cadastrado/i)).toBeInTheDocument());
  });

  it('exibe mensagem de erro generica em falha desconhecida', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Unknown'));

    renderWithProviders(<RegisterForm />);

    await userEvent.type(screen.getByLabelText(/nome completo/i), 'João');
    await userEvent.type(screen.getByLabelText(/e-mail/i), 'joao@email.com');
    await userEvent.type(screen.getByLabelText(/senha/i, { selector: 'input' }), 'senha123');
    await userEvent.click(screen.getByRole('button', { name: /Finalizar Cadastro/i }));

    expect(await screen.findByText(/Não foi possível realizar o cadastro/i)).toBeInTheDocument();
  });

  it('alterna visibilidade da senha ao clicar no icone', async () => {
    renderWithProviders(<RegisterForm />);
    const passwordInput = screen.getByLabelText(/senha/i, { selector: 'input' });
    
    // O MUI renderiza o botão dentro do InputAdornment, procuramos pelo ícone ou pelo botão de visibilidade
    const toggleBtn = screen.getByRole('button', { name: /mostrar senha/i });

    expect(passwordInput).toHaveAttribute('type', 'password');
    await userEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    await userEvent.click(screen.getByRole('button', { name: /ocultar senha/i }));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
