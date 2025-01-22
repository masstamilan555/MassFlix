import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js"
import { User } from "../models/user.model.js"
import mongoose from "mongoose"

export const protectRoute=async(req,res,next)=>{ //next is to call the next routes
    try {
        const token = req.cookies['jwt-netflix']
        
        
        if(!token){
            return res.status(401).json({message:"Not authorized to access this route"})
        }
        const decoded = jwt.verify(token,ENV_VARS.JWT_SECRET)
        
        if(!decoded){
            return res.status(401).json({message:"Not authorized to access this route"})
        }
        const user = await User.findById(decoded.userid).select("-password")

        
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        req.user = user
        next() //this is to call the next routes
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"internal server error"})
        
    }

}