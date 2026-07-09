import express from "express";

const app = express();

app.get("/health", (req, res) => {
  res.json({
    service: process.env.SERVICE_NAME,
    status: "UP",
  });
});

export default app;
