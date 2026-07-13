import { createPaymentRepository } from "./payment.repository.js";
import { createPaymentService } from "./payment.service.js";

const repository = createPaymentRepository();

const service = createPaymentService(repository);

export default service;
