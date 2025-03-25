import express from "express";
import { authenticate } from "../authMiddleware/authMiddleware.js";
import { deleteUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/update", authenticate, updateUser)
router.get("/delete", authenticate , deleteUser)

export default router;