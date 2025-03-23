import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"

dotenv.config();

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
    try {
        
        const {name, email, password} = req.body;

        if (!name || !email ||!password){
            return res.status(400).json({
                message: "All fields are required",
            })
        }
    
        const existingUser = await prisma.user.findUnique({where:{email: email}});
    
        if (existingUser){
            return res.status(400).json({
                message: "User Already Exists"
            })
        }
    
        const hashedPass = await bcrypt.hash(password, 10);
    
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPass
            }
        })

        res.status(201).json({ message: "User Registered Successfully", user: newUser });
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ 
            message: "Something went wrong",
            error: error.message });
    }
}

export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        if (!email ||!password){
            return res.status(400).json({
                message: "All fields are required",
            })
        }

        const existingUser = await prisma.user.findUnique({where: {email}});
        if (!existingUser) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        const passMatch = bcrypt.compareSync(password, existingUser.password)
        if (!passMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token , {
            httpOnly:true,
            secure: process.env.NODE_ENV || "production",
            sameSite: "strict",
            maxAge:  60*60*1000,  
        })
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

export const logoutUser = (req, res) => {
    res.cookie("auth_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0, // Instantly expire the cookie
    });

    res.status(200).json({ message: "Logout successful" });
};