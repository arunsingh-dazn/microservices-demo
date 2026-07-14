import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { correlationIdMiddleware } from "@microservices-demo/shared";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(correlationIdMiddleware);

app.get("/health", (req, res) => {
  res.json({
    service: process.env.SERVICE_NAME,
    status: "UP",
  });
});

app.use("/api/v1", routes);

app.use(errorMiddleware);

export default app;
