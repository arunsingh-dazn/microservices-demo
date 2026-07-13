export function createPaymentService(repository) {
  return {
    async createPayment(payload) {
      return repository.create(payload);
    },
  };
}
