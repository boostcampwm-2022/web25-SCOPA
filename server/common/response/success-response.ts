export class SuccessResponse {
  private readonly statusCode: number;
  private readonly message: string;
  private readonly result: unknown;
  constructor(result: unknown, statusCode = 10000, message = '성공') {
    this.statusCode = statusCode;
    this.result = result;
    this.message = message;
  }
}
