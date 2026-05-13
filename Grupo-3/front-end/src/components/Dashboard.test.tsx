import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Dashboard from './Dashboard';
import { renderWithProviders } from '../test-utils';

describe('Dashboard', () => {
  it('renderiza o titulo e as estatisticas principais', () => {
    renderWithProviders(<Dashboard />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText(/Monitoramento em tempo real/i)).toBeInTheDocument();
    
    // Verifica se os cards de estatisticas estao presentes
    expect(screen.getByText(/JWT Active/i)).toBeInTheDocument();
    expect(screen.getByText(/MFE Stack/i)).toBeInTheDocument();
    expect(screen.getByText(/Dockerized/i)).toBeInTheDocument();
    expect(screen.getByText(/Mapeadas/i)).toBeInTheDocument();
  });

  it('renderiza o status das integracoes', () => {
    renderWithProviders(<Dashboard />);
    
    expect(screen.getByText('Status da Integração')).toBeInTheDocument();
    expect(screen.getByText('Shell Host')).toBeInTheDocument();
    expect(screen.getByText('MFE Auth')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
  });

  it('renderiza o resumo do projeto', () => {
    renderWithProviders(<Dashboard />);
    
    expect(screen.getByText('Resumo Executivo')).toBeInTheDocument();
    expect(screen.getByText(/Arquitetura MFE escalável/i)).toBeInTheDocument();
    expect(screen.getByText(/Auth JWT Security robusto/i)).toBeInTheDocument();
  });
});
