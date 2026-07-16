import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",

  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({
      stack: true,
    }),
    winston.format.printf((info) => {
      const { timestamp, level, message, stack, ...meta } = info;

      const metadata = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : "";

      return stack
        ? `[${timestamp}] ${level}: ${stack}${metadata}`
        : `[${timestamp}] ${level}: ${message}${metadata}`;
    }),
  ),

  transports: [
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ],
});

export default logger;
