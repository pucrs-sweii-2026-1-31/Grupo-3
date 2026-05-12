import { ApiClientError } from '../types/api';
import { requestJson } from './httpClient';
import { tokenStorage } from './tokenStorage';

describe('httpClient', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('envia Authorization Bearer quando chamada autenticada tem token', async () => {
    tokenStorage.setToken('jwt-token');
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);

    await requestJson('/users', { authenticated: true });

    const headers = fetchMock.mock.calls[0][1]?.headers as Headers;
    expect(headers.get('Authorization')).toBe('Bearer jwt-token');
  });

  it('limpa token local em erro 401', async () => {
    tokenStorage.setToken('jwt-token');
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ status: 401, error: 'Unauthorized', message: 'Credenciais invalidas' }),
    } as Response);

    await expect(requestJson('/users', { authenticated: true })).rejects.toBeInstanceOf(ApiClientError);
    expect(tokenStorage.getToken()).toBeNull();
  });
});
