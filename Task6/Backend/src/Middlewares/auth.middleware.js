import { asynchandler } from "../utils/asynchandler.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import { User } from "../Models/User.model.js";



export const verifyJWT=asynchandler(async(req,res,next)=>{
    try{
        console.log(req.cookies)
        const token=req.cookies?.accesstoken || req.header("Authorization").split(" ")[1];

        console.log(token)
        
        if (!token){
            return res.status(401).json( new ApiResponse(401,{},"Unauthorized Request")
        )}
        const decoded=await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decoded?._id).select("-password -refreshtoken")
        if(!user){
            return res.status(401).json( new ApiResponse(400,{},"Invalid Access Token")
        )}
        req.user=user
        next()
    }
    catch(err){
        return res.status(401).json( new ApiResponse(401,{},err.message || "invalid access token")
    )}
})