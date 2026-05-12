import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { vi } from 'vitest';

const ThrowError = () => {
  throw new Error('Test Error');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza children quando nao ha erro', () => {
    render(
      <ErrorBoundary>
        <div>Safe Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe Content')).toBeInTheDocument();
  });

  it('renderiza UI de erro quando um erro ocorre', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Módulo indisponível')).toBeInTheDocument();
    expect(screen.getByText(/Não foi possível carregar o componente solicitado/i)).toBeInTheDocument();
  });

  it('reseta o estado de erro quando clicar em tentar novamente', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Módulo indisponível')).toBeInTheDocument();
    
    // Primeiro mudamos o filho para um que não quebra
    rerender(
      <ErrorBoundary>
        <div>Recovered Content</div>
      </ErrorBoundary>
    );

    // Agora clicamos em tentar novamente para limpar o estado de erro
    fireEvent.click(screen.getByText('Tentar novamente'));
    
    expect(screen.getByText('Recovered Content')).toBeInTheDocument();
  });
});
