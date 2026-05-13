import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ShellLayout from './ShellLayout';
import { renderWithProviders } from '../test-utils';

describe('ShellLayout', () => {
  const mockOnToggleMode = vi.fn();

  it('renderiza os elementos de navegacao e brand', () => {
    renderWithProviders(
      <ShellLayout mode="light" onToggleMode={mockOnToggleMode}>
        <div>Content</div>
      </ShellLayout>
    );

    // Verifica Brand
    const brandElements = screen.getAllByText('Chave');
    expect(brandElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/Orquestrador de Competências/i)).toBeInTheDocument();

    // Verifica itens de navegacao
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
  });

  it('chama onToggleMode ao clicar no botao de tema', () => {
    renderWithProviders(
      <ShellLayout mode="light" onToggleMode={mockOnToggleMode}>
        <div>Content</div>
      </ShellLayout>
    );

    const toggleBtn = screen.getByLabelText(/Modo Escuro/i);
    fireEvent.click(toggleBtn);
    expect(mockOnToggleMode).toHaveBeenCalled();
  });

  it('abre e fecha o menu mobile', async () => {
    renderWithProviders(
      <ShellLayout mode="light" onToggleMode={mockOnToggleMode}>
        <div>Content</div>
      </ShellLayout>
    );
    
    const openBtn = screen.getByTestId('MenuIcon').parentElement;
    await userEvent.click(openBtn);
    
    // Verifica se o conteúdo do drawer apareceu (estará duplicado pois o sidebar fixo também está lá)
    const dashboardLinks = screen.getAllByText('Dashboard');
    expect(dashboardLinks.length).toBeGreaterThan(1);
    
    // Clica no dashboard link do mobile drawer para fechar (onNavigate)
    await userEvent.click(dashboardLinks[1]);

    // Reabre e fecha via backdrop/escape (onClose)
    await userEvent.click(openBtn);
    fireEvent.keyDown(screen.getByRole('presentation'), { key: 'Escape', code: 'Escape' });
  });

  it('realiza logout ao clicar no botao de sair', () => {
    const clearSpy = vi.spyOn(Storage.prototype, 'clear');
    
    renderWithProviders(
      <ShellLayout mode="light" onToggleMode={mockOnToggleMode}>
        <div>Content</div>
      </ShellLayout>
    );

    const logoutBtn = screen.getByLabelText(/sair/i);
    fireEvent.click(logoutBtn);
    expect(clearSpy).toHaveBeenCalled();
  });

  it('renderiza corretamente no modo escuro', () => {
    renderWithProviders(
      <ShellLayout mode="dark" onToggleMode={mockOnToggleMode}>
        <div>Content</div>
      </ShellLayout>
    );
    
    // Verifica se o ícone de tema claro (sol) aparece quando estamos no dark
    expect(screen.getByLabelText(/Modo Claro/i)).toBeInTheDocument();
  });
});
