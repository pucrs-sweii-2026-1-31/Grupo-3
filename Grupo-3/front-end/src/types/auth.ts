export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  userName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export interface UserSummary {
  id: number;
  userName: string;
  email: string;
}

export interface AuthSession {
  token: string;
  refreshToken: string;
}
