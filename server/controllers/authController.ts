import {Request, Response} from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {PrismaClient} from "@prisma/client"
import dotenv from "dotenv"

dotenv.config();

const prisma = new PrismaClient();

// Register a new user
export const registerUser = async(req:Request,res:Response) => {
    const {name,email, password} = req.body;

    try {
        const existinguser = await prisma.user.findUnique({where: {email}});
        if (existinguser){
            return res.status(400).json({
                message: "User Already Exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);

        // Create User 
        const newuser = await prisma.user.create({
            data: {name, email, password:hashedPassword},
        })

        return res.status(201).json({
            message: "User Registered Successfully !"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error Registering the User at this time",
            errorMessage: error.message,
            error: error,
        })
    }
}

export const loginUser = async (req:Request, res:Response) => {
    const {email, password} = req.body;

    try {
        const user = await prisma.user.findUnique({where:{email}});
        if (!user){
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }
    } catch (error) {
        
    }
}