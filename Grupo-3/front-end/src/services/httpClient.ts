import { ApiClientError, ApiErrorResponse } from '../types/api';
import { tokenStorage } from './tokenStorage';

const DEFAULT_AUTH_URL = 'http://localhost:3001/api/auth';

export function getAuthBaseUrl(): string {
  return import.meta.env.VITE_MS_AUTH_URL || DEFAULT_AUTH_URL;
}

interface RequestOptions extends RequestInit {
  authenticated?: boolean;
}

export async function requestJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  const token = tokenStorage.getToken();
  if (options.authenticated && token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${getAuthBaseUrl()}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let details: ApiErrorResponse | undefined;
    try {
      details = await response.json();
    } catch {
      details = undefined;
    }

    if (response.status === 401) {
      tokenStorage.clearToken();
    }

    throw new ApiClientError(response.status, details?.message || 'Erro ao comunicar com a API', details);
  }

  return response.json() as Promise<T>;
}
