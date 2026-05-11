export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  timestamp?: string;
  status: number;
  error: string;
  message: string;
  path?: string;
  validationErrors?: Array<{
    field: string;
    message: string;
  }> | null;
}

export class ApiClientError extends Error {
  status: number;
  details?: ApiErrorResponse;

  constructor(status: number, message: string, details?: ApiErrorResponse) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.details = details;
  }
}
