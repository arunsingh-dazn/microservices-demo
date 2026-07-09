export class ApiResponse {
  constructor({ statusCode = 200, message, data, success = true }) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;

    if (data !== undefined) {
      this.data = data;
    }

    this.timestamp = new Date().toISOString();
  }
}
