
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchandler } from "../utils/asynchandler.js";

export const isadmin=asynchandler(async(req,res,next)=>{
    const user=req.user
    if (!user.isadmin){
        res.status(400).json( new ApiResponse(400,{},"Not authorized to access the admin page")
)}
    next();
})