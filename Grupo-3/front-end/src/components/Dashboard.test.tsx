import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Dashboard from './Dashboard';
import { renderWithProviders } from '../test-utils';

describe('Dashboard', () => {
  it('renderiza o titulo e as estatisticas principais', async () => {
    renderWithProviders(<Dashboard />);
    
    expect(await screen.findByText('Dashboard', {}, { timeout: 3000 })).toBeInTheDocument();
    expect(screen.getByText(/Monitoramento em tempo real/i)).toBeInTheDocument();
    
    // Verifica se os cards de estatisticas estao presentes
    expect(await screen.findByText(/JWT Active/i, {}, { timeout: 3000 })).toBeInTheDocument();
    expect(screen.getByText(/MFE Stack/i)).toBeInTheDocument();
    expect(screen.getByText(/Dockerized/i)).toBeInTheDocument();
    expect(screen.getByText(/Mapeadas/i)).toBeInTheDocument();
  });

  it('renderiza o status das integracoes', async () => {
    renderWithProviders(<Dashboard />);
    
    expect(await screen.findByText('Status da Integração', {}, { timeout: 3000 })).toBeInTheDocument();
    expect(screen.getByText('Shell Host')).toBeInTheDocument();
    expect(screen.getByText('MFE Auth')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
  });

  it('renderiza o resumo do projeto', async () => {
    renderWithProviders(<Dashboard />);
    
    expect(await screen.findByText('Resumo Executivo', {}, { timeout: 3000 })).toBeInTheDocument();
    expect(screen.getByText(/Arquitetura MFE escalável/i)).toBeInTheDocument();
    expect(screen.getByText(/Auth JWT Security robusto/i)).toBeInTheDocument();
  });

  it('renderiza corretamente no modo escuro', async () => {
    renderWithProviders(<Dashboard />, { mode: 'dark' });
    // Esperamos por um conteúdo dentro do StatCard para garantir que o Skeleton sumiu
    expect(await screen.findByText(/JWT Active/i, {}, { timeout: 3000 })).toBeInTheDocument();
  });
});
