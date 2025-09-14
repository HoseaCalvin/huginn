import jwt from "jsonwebtoken";

export const authenticationToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    
    if(!authHeader) {
        res.status(401).json({
            success: false,
            message: "Missing token!"
        })
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or Expired Token!"
        })   
    }
}