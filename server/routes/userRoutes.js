import express from "express";
import { authenticate } from "../authMiddleware/authMiddleware.js";
import { updateUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/update", authenticate, updateUser)

export default router;