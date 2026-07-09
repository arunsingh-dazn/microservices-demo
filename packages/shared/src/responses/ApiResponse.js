export class ApiResponse {
  constructor({ statusCode, message, data = null, success = true }) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }
}
