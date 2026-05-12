import { ApiClientError } from '../types/api';
import { requestJson, getAuthBaseUrl } from './httpClient';
import { tokenStorage } from './tokenStorage';

describe('httpClient', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('usa a URL base do ambiente se disponível', () => {
    vi.stubEnv('VITE_MS_AUTH_URL', 'http://api.test');
    expect(getAuthBaseUrl()).toBe('http://api.test');
    vi.unstubAllEnvs();
  });

  it('envia Authorization Bearer quando chamada autenticada tem token', async () => {
    tokenStorage.setToken('jwt-token');
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as unknown as Response);

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
    } as unknown as Response);

    await expect(requestJson('/users', { authenticated: true })).rejects.toThrow('Credenciais invalidas');
    expect(tokenStorage.getToken()).toBeNull();
  });

  it('lida com erro de API quando corpo nao e JSON', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.reject(new Error('Not JSON')),
    } as unknown as Response);

    await expect(requestJson('/test')).rejects.toThrow('Erro ao comunicar com a API');
  });
});
