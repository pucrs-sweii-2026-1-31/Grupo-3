import { ApiResponse } from '../types/api';
import { LoginCredentials, LoginResponse, RegisterCredentials, UserSummary } from '../types/auth';
import { requestJson } from './httpClient';

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await requestJson<ApiResponse<LoginResponse>>('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  return response.data;
}

export async function register(credentials: RegisterCredentials): Promise<UserSummary> {
  const response = await requestJson<ApiResponse<UserSummary>>('/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  return response.data;
}

export const authService = {
  login,
  register,
};
