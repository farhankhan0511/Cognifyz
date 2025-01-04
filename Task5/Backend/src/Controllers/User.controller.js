
import {asynchandler} from "../utils/asynchandler.js"

import { z } from "zod"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../Models/User.model.js"
import { Tourpackage } from "../Models/Tourpackage.model.js"
const UserSChema=z.object({
    username:z.string(),
    Name:z.string(),
    isadmin:z.boolean(),
    email:z.string().email(),
    password:z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, 
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one digit",
   )
})

const getallpackages=asynchandler(async(req,res)=>{
   
    let packages;
    try {
        packages=await Tourpackage.find({});
    } catch (error) {
        return res.status(400).json( new ApiError(500,"Error while retriving tourpackages")
    )}
    if (!packages){
        return res.status(400).json( new ApiError(203,"No packages")
    )}
    return res.status(200).json(
        new ApiResponse(200,packages,"Packages retrived successfully")
    )

})
const registerUser=asynchandler(async(req,res)=>{
        let validdata;
        try {
            
            validdata=UserSChema.parse(req.body)
            
        } catch (err) {
            return res.status(400).json( new ApiError(400,err.message || "Fill the form correctly")
        )}
        
            const existeduser=await User.findOne({
                $or:[{username:validdata.username},{email:validdata.email}]
            })
            if(existeduser){ 
                return res.status(400).json( new ApiError(400,"User with email or username already exists")
            )}
            const user=await User.create({
                username:validdata.username.toLowerCase(),email:validdata.email,password:validdata.password,Name:validdata.Name,isadmin:validdata.isadmin
            })
          
            const createduser=await User.findById(user._id).select("-password -refreshtoken")
         
            if(!createduser){
                return res.status(400).json( new ApiError(500,"Something went wrong while signing up the user")
            )    
            }
            return res.status(201).json(
                new ApiResponse(201,createduser,"User Registered Successfully")
            )
            
   
})

const generateaccesandrefreshtoken=async(user_id)=>{
    try {
        
            const user=await User.findById(user_id)
         
            const accesstoken=await user.generateaccesstoken()
            
            const refreshtoken=await user.generaterefreshtoken()
            user.refreshtoken=refreshtoken
            await user.save({validateBeforeSave:false})
    
            return {accesstoken,refreshtoken}
    } catch (error) {
        return res.status(400).json( new ApiError(500,"Error while generating tokens")
    )}
   
}

const userlogin=asynchandler(async(req,res)=>{
    const {username,email,password}=req.body
   
   

    if(!(username || email)){
        return res.status(400).json( new ApiError(401,"Invalid username and email")
    )}
    const user=await User.findOne({$or:[{username},{email}]})
    if (!user){
        return res.status(400).json( new ApiError(400,"User Not Found")
    )}
    const validpassword= await user.isPasswordCorrect(password)
   
    if(!validpassword){
        return res.status(400).json( new ApiError(401,"Invalid Password")
)
    }
    const {accesstoken,refreshtoken}=await generateaccesandrefreshtoken(user._id)
    const loggedinuser=await User.findById(user._id).select("-password -refreshtoken")

    const options={
        httpOnly:true,
        secure:true,
        sameSite:"None",
        path:"/"
    }

    
    return res.status(200)
    .cookie("accesstoken",accesstoken,options)
    .cookie("refreshtoken",refreshtoken,options)
    .json(
        new ApiResponse(200,
            {
                user:loggedinuser,accesstoken,refreshtoken
            },
            "USer logged In Successfully"
        )
    )



});
const logout=asynchandler(async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.user?._id,{
            $unset:{refreshtoken:1}
        },{
            new:1
        })
        const options={
            httpOnly:true,
            secure:true,
            sameSite:"None"
        }
        return res.status(200).clearCookie("accesstoken",options).clearCookie("refreshtoken",options).json(
            new ApiResponse(200,{},"User Logout Successfull")
        )
    } catch (err) {
        return res.status(400).json( new ApiError(500,"Something went wrong while logouting")
    )}
})
const getcurrentUser=asynchandler(async(req,res)=>{
    return res.status(200).json(
        new ApiResponse(200,req.user,"Current user fetched Successfully")
    )
})


export {registerUser,logout,userlogin,getcurrentUser,getallpackages}