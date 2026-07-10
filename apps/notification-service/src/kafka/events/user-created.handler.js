export async function handleUserCreated(payload) {
  console.log("");
  console.log("================================");
  console.log("📧 Welcome Email Service");
  console.log("================================");
  console.log(`👤 User: ${payload.firstName} ${payload.lastName}`);
  console.log(`📩 Email: ${payload.email}`);
  console.log("✅ Welcome Email Sent");
  console.log("================================");
  console.log("");
}
