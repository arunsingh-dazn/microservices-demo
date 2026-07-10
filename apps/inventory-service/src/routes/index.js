import { Router } from "express";

import { inventoryRouter } from "../modules/inventory/index.js";

const router = Router();

router.use("/inventory", inventoryRouter);

export default router;
