import { Router } from "express";

import { orderRouter } from "../modules/orders/index.js";

const router = Router();

router.use("/orders", orderRouter);

export default router;
