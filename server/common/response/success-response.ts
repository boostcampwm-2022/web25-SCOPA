export class SuccessResponse {
  private readonly code: number;
  private readonly message: string;
  private readonly data?: unknown;

  constructor(data?: unknown, code = 10000, message = '성공') {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
