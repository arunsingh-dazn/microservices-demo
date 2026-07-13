import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    service: "payment-service",
    status: "UP",
  });
});

export default router;
