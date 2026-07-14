import express from "express";
import routes from "./routes/index.js";
import { correlationIdMiddleware } from "@microservices-demo/shared";

const app = express();

app.use(express.json());
app.use(correlationIdMiddleware);

app.use("/api/v1", routes);

export default app;
