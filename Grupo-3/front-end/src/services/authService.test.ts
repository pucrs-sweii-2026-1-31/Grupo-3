import { authService } from './authService';
import { requestJson } from './httpClient';
import { vi } from 'vitest';

vi.mock('./httpClient', () => ({
  requestJson: vi.fn(),
}));

describe('authService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('login', () => {
    it('chama httpClient com payload correto e retorna data', async () => {
      const mockResponse = { data: { token: 'mock-token' } };
      vi.mocked(requestJson).mockResolvedValue(mockResponse);

      const credentials = { email: 'test@email.com', password: '123' };
      const response = await authService.login(credentials);

      expect(requestJson).toHaveBeenCalledWith('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      expect(response).toEqual({ token: 'mock-token' });
    });
  });

  describe('register', () => {
    it('chama httpClient com payload correto e retorna data', async () => {
      const mockResponse = { data: { id: 1, userName: 'user', email: 'test@email.com' } };
      vi.mocked(requestJson).mockResolvedValue(mockResponse);

      const credentials = { userName: 'user', email: 'test@email.com', password: '123' };
      const response = await authService.register(credentials);

      expect(requestJson).toHaveBeenCalledWith('/register', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      expect(response).toEqual(mockResponse.data);
    });
  });
});
