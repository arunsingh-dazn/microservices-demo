import { logger } from "@microservices-demo/shared";

export async function handleUserCreated(payload) {
  console.log("");
  console.log("================================");
  console.log("📧 Welcome Email Service");
  console.log("================================");

  logger.info({
    message: "Received USER_CREATED",
    service: "notification-service",
    event: "USER_CREATED",
    correlationId: payload.correlationId,
    userId: payload.userId,
    email: payload.email,
  });

  console.log(`👤 User: ${payload.firstName} ${payload.lastName}`);
  console.log(`📩 Email: ${payload.email}`);
  console.log("✅ Welcome Email Sent");

  logger.info({
    message: "Welcome email sent",
    service: "notification-service",
    event: "WELCOME_EMAIL_SENT",
    correlationId: payload.correlationId,
    userId: payload.userId,
    email: payload.email,
    notificationType: "EMAIL",
  });

  console.log("================================");
  console.log("");
}
