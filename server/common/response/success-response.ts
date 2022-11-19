export class SuccessResponse<T> {
  private readonly code: number;
  private readonly message: string;
  private readonly data?: T;

  constructor(data?: T, code = 10000, message = '성공') {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
