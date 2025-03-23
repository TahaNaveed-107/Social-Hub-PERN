import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import router from "./routes/authRoutes.js";



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/",router)


// Default Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

connectDB()
// Start Server
const PORT = 4004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
