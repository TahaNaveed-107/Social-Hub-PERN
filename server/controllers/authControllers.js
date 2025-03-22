import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Prisma, PrismaClient } from "@prisma/client";
import dotenv from "dotenv"

dotenv.config();

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
    try {
        
        const {name, email, password} = req.body;
    
        const existinguser = await prisma.user.findUnique({where:{email: email}});
    
        if (existinguser){
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
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}