import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './App';

describe('PrivateRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redireciona para /login quando nao ha token', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Pagina de Login</div>} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <div>Dashboard Protegido</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Pagina de Login')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard Protegido')).not.toBeInTheDocument();
  });

  it('renderiza o componente filho quando ha token', () => {
    localStorage.setItem('token', 'fake-jwt-token');

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Pagina de Login</div>} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <div>Dashboard Protegido</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard Protegido')).toBeInTheDocument();
    expect(screen.queryByText('Pagina de Login')).not.toBeInTheDocument();
  });
});
