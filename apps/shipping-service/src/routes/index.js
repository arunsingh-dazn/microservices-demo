import { Router } from "express";

import { shippingRouter } from "../modules/shipping/index.js";

const router = Router();

router.use("/shipments", shippingRouter);

export default router;
