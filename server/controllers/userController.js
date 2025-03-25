import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const updateUser = async (req, res) => {

    try {
        const userId = req.token.userId;
        const {name, password} = req.body;

        const existingUser = await prisma.user.findUnique({where: {id: userId}});

        if (!existingUser){
            return res.status(400).json({
                message: "User not logged in"
            })
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const updatedUser = await prisma.user.update({
            where: {id: userId},
            data: {
                name: name || existingUser.name,
                password: hashedPass || existingUser.password
            }
        })

        return res.status(201).json({
            message: "user Updated",
            user: updatedUser
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
    
}

export const deleteUser = async (req, res) => {
    console.log(req.token)
    const email = req.token.email;

    try {
        await prisma.user.delete({where: {email: email}})
        return res.status(200).json({
            message: "User deleted Successfully"
        })
    } catch (error) {
        return res.status(200).json({
            message: "Server Error",
            error: error.message
        }) 
    }
}