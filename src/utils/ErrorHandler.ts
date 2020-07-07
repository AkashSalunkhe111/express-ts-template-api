export default class ErrorHandler extends Error {
  statusCode: number;
  code?: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
