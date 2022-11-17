export class SuccessResponse {
  private readonly code: number;
  private readonly message: string;
  private readonly result: unknown;

  constructor(result: unknown, code = 10000, message = '성공') {
    this.code = code;
    this.message = message;
    this.result = result;
  }
}
