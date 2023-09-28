export class APIResponse<T = any> {
  message: string;
  statusCode: number;
  data: T | any;
  errorCode?: number;
  errorMessage?: string;
  total?: number;
  limit?: number;
  page?: number;
}
