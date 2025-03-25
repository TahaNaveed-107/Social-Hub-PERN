import jwt from "jsonwebtoken"

export const authenticate = (req, res, next) => { 
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, Please Login Again" });
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.token = decoded;
        next()
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};