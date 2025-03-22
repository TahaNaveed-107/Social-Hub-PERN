import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectDB(){
    try {
        await prisma.$connect();
        console.log("Postgresql connected Successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

export default connectDB;