import { screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { renderWithProviders } from '../test-utils';

describe('Dashboard', () => {
  it('renderiza o titulo e as estatisticas principais', () => {
    renderWithProviders(<Dashboard />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText(/Visão geral da plataforma/i)).toBeInTheDocument();
    
    // Verifica se os cards de estatisticas estao presentes
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Microfrontend')).toBeInTheDocument();
    expect(screen.getByText('Infraestrutura')).toBeInTheDocument();
    expect(screen.getByText('Avaliações')).toBeInTheDocument();
  });

  it('renderiza o status das integracoes', () => {
    renderWithProviders(<Dashboard />);
    
    expect(screen.getByText('Status das Integrações')).toBeInTheDocument();
    expect(screen.getByText('Shell Host')).toBeInTheDocument();
    expect(screen.getByText('Module Federation')).toBeInTheDocument();
    expect(screen.getByText('Bearer JWT')).toBeInTheDocument();
  });

  it('renderiza o resumo do projeto', () => {
    renderWithProviders(<Dashboard />);
    
    expect(screen.getByText('Resumo do Projeto')).toBeInTheDocument();
    expect(screen.getByText(/Arquitetura Microfrontend/i)).toBeInTheDocument();
    expect(screen.getByText(/Autenticação JWT/i)).toBeInTheDocument();
  });
});
