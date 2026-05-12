import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './useAuth';
import { authService } from '../services/authService';
import { tokenStorage } from '../services/tokenStorage';
import { vi } from 'vitest';

vi.mock('../services/authService');
vi.mock('../services/tokenStorage');

describe('useAuth', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('lanca erro se usado fora do AuthProvider', () => {
    // Silencia o erro do console esperado
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useAuth())).toThrow('useAuth deve ser usado dentro de AuthProvider');
    consoleError.mockRestore();
  });

  it('inicializa como nao autenticado quando nao ha token', () => {
    vi.mocked(tokenStorage.getToken).mockReturnValue(null);
    const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.token).toBeNull();
    expect(result.current.authenticated).toBe(false);
  });

  it('inicializa como autenticado quando ha token salvo', () => {
    vi.mocked(tokenStorage.getToken).mockReturnValue('saved-token');
    const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.token).toBe('saved-token');
    expect(result.current.authenticated).toBe(true);
  });

  it('login atualiza estado e salva token', async () => {
    vi.mocked(tokenStorage.getToken).mockReturnValue(null);
    vi.mocked(authService.login).mockResolvedValue({ token: 'new-token' });
    const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.login({ email: 'test', password: '123' });
    });
    
    expect(authService.login).toHaveBeenCalled();
    expect(tokenStorage.setToken).toHaveBeenCalledWith('new-token');
    expect(result.current.token).toBe('new-token');
    expect(result.current.authenticated).toBe(true);
  });

  it('logout limpa estado e token storage', () => {
    vi.mocked(tokenStorage.getToken).mockReturnValue('saved-token');
    const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    act(() => {
      result.current.logout();
    });
    
    expect(tokenStorage.clearToken).toHaveBeenCalled();
    expect(result.current.token).toBeNull();
    expect(result.current.authenticated).toBe(false);
  });
});
