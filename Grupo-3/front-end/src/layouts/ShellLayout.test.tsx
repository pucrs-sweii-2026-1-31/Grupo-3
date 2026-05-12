import { screen, fireEvent } from '@testing-library/react';
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
    expect(screen.getByText(/Sistema de Autoavaliação/i)).toBeInTheDocument();

    // Verifica itens de navegacao
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Cadastro').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Transparência').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
  });

  it('chama onToggleMode ao clicar no botao de tema', () => {
    renderWithProviders(
      <ShellLayout mode="light" onToggleMode={mockOnToggleMode}>
        <div>Content</div>
      </ShellLayout>
    );

    const toggleBtn = screen.getByLabelText(/tema escuro/i);
    fireEvent.click(toggleBtn);
    expect(mockOnToggleMode).toHaveBeenCalled();
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
});
