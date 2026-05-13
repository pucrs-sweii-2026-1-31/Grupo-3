import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

vi.mock('./components/LoginForm', () => ({
  default: ({ onLogin }: any) => (
    <button onClick={() => onLogin('fake-token')}>Mock Login</button>
  ),
}));

vi.mock('./components/RegisterForm', () => ({
  default: () => <div>Mock Register</div>,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  const { MemoryRouter } = actual as any;
  return {
    ...actual,
    BrowserRouter: ({ children }: any) => <MemoryRouter>{children}</MemoryRouter>,
  };
});

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders the application shell and redirects to login by default', async () => {
    render(<App />);
    expect(await screen.findByText('Mock Login')).toBeInTheDocument();
  });

  it('inicia no modo escuro se estiver no localStorage', async () => {
    // Usamos spy para garantir que o valor inicial seja capturado pelo useState
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('dark');
    
    render(<App />);
    
    const container = await screen.findByTestId('app-container');
    expect(container).toHaveAttribute('data-theme', 'dark');
    
    getItemSpy.mockRestore();
  });

  it('toggles theme mode when toggleMode is called', async () => {
    localStorage.setItem('token', 'fake-token');
    render(<App />);
    
    const toggleBtn = await screen.findByLabelText(/Modo Escuro/i);
    fireEvent.click(toggleBtn);
    
    const container = await screen.findByTestId('app-container');
    expect(container).toHaveAttribute('data-theme', 'dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    // Clica novamente para voltar ao light (cobre a outra branch)
    const toggleBtnLight = await screen.findByLabelText(/Modo Claro/i);
    fireEvent.click(toggleBtnLight);
    expect(container).toHaveAttribute('data-theme', 'light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('executes handleLogin logic', async () => {
    vi.stubGlobal('location', { ...window.location, href: '' });

    render(<App />);
    
    const loginBtn = await screen.findByText('Mock Login');
    fireEvent.click(loginBtn);
    
    expect(localStorage.getItem('token')).toBe('fake-token');
    vi.unstubAllGlobals();
  });
});
