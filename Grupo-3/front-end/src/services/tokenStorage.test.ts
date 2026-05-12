import { tokenStorage } from './tokenStorage';

describe('tokenStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('getToken retorna null quando nao ha token armazenado', () => {
    expect(tokenStorage.getToken()).toBeNull();
  });

  it('setToken persiste o token no localStorage', () => {
    tokenStorage.setToken('my-jwt-token');
    expect(localStorage.getItem('token')).toBe('my-jwt-token');
  });

  it('getToken retorna o token salvo corretamente', () => {
    tokenStorage.setToken('my-jwt-token');
    expect(tokenStorage.getToken()).toBe('my-jwt-token');
  });

  it('clearToken remove o token do localStorage', () => {
    tokenStorage.setToken('my-jwt-token');
    tokenStorage.clearToken();
    expect(tokenStorage.getToken()).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('setToken sobrescreve token existente', () => {
    tokenStorage.setToken('old-token');
    tokenStorage.setToken('new-token');
    expect(tokenStorage.getToken()).toBe('new-token');
  });
});
