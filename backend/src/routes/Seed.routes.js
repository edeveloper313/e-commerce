// backend/routes/seedRoutes.js
import express from "express"

import seedProducts from "../controllers/Seed.controller.js"
const router = express.Router();

router.get('/products', seedProducts);

export default router