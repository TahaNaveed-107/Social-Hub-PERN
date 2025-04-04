import { loginUser, logoutUser, registerUser } from "../controllers/authControllers.js";
import express from "express"

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)

export default router;