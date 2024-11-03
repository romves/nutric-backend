export interface Response<T> {
  data: T;
  success?: boolean;
  message?: string;
  meta?: any;
}

export function createResponse<T>(
  data: T,
  message: string = '',
  success: boolean = true,
  meta?: any,
): Response<T> {
  return {
    data,
    success,
    message,
    meta,
  };
}

export function createErrorResponse(message: string): Response<null> {
  return {
    success: false,
    message,
    data: null,
  };
}
