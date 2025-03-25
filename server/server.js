import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middleware
app.use(cors({credentials:true, origin: "http://localhost:4004"}));
app.use(express.json());
app.use(cookieParser())

app.use("/",authRouter)
app.use("/user/",userRouter)


// Default Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

connectDB()
// Start Server
const PORT = 4004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));