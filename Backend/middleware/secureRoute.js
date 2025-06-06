import jwt from "jsonwebtoken";
import User from "../models/user.js";


const secureRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "Unauthorized"});
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if(!decoded){
            return res.status(401).json({error: "Invalid token"});
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({error: "No user found"});
        }
        req.user = user;
        next();


    }catch(error){
        console.log("Error in secureRoute:",error)
        res.status(500).json({error:"Something went wrong"})
    }
}
export default secureRoute;