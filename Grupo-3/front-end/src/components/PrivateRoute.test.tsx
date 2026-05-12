import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

describe('PrivateRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redireciona para login quando nao ha token', () => {
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/private" element={
            <PrivateRoute>
              <div>Private Content</div>
            </PrivateRoute>
          } />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Private Content')).not.toBeInTheDocument();
  });

  it('renderiza children quando ha token', () => {
    localStorage.setItem('token', 'valid-token');
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/private" element={
            <PrivateRoute>
              <div>Private Content</div>
            </PrivateRoute>
          } />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Private Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
