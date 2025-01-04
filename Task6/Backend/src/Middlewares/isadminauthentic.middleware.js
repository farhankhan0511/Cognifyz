import { Tourpackage } from "../Models/Tourpackage.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchandler.js";

export const isadminauthentic=asynchandler(async(req,res,next)=>{

    const {id}=req.params;
    
    const user=req.user;
    let tour;
    try {
        tour=await Tourpackage.findOne({_id:id,Admin:user})
       
    } catch (error) {
        res.status(401).json( new ApiError(401,{},error.message || "Unauthorized request")
    )} if(!tour){
        res.status(401).json( new ApiError(401,{},"Unauthorized request")
    )}
    next();

})