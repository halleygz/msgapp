import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token){
            return res.status(401).json({error: "Unauthorised - couldn't get token"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({error: "Unauthorides - Invalid Token"})
        }
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            return res.status(401).json({error: 'user not found'})
        }
        req.user = user
        next()
    } catch (error) {
        console.log('error in protectRoute Middleware', error.message);
        res.status(500).json({error: 'internal server error'})
    }
}
export default protectRoute