
import bcrypt from "bcrypt";
import { z } from "zod";
import { User } from "./Usermodel.js";
import { asynchandler } from "./asynchandler.js";
import { ApiResponse } from "./utils/ApiResponse.js";

const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one digit"
    ),
});

export const registerUser = asynchandler(async (req, res) => {
    let validatedData;
    try {
        validatedData = UserSchema.parse(req.body);
    } catch (err) {
        return res.status(400).json(new ApiResponse(400, {}, err.message || "Invalid input data"));
    }

    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
        return res.status(400).json(new ApiResponse(400, {}, "User with this email already exists"));
    }

    

    const user = await User.create({
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password,
    })
    const createduser=await User.findById(user._id).select("-password -refreshtoken")
         
            if(!createduser){
                return res.status(400).json( new ApiError(500,"Something went wrong while signing up the user")
            )    
            }

    const { accesstoken, refreshtoken } = await generateaccesandrefreshtoken(user._id);

    const options = {
        httpOnly: true,
        secure: true,
    };

    res.status(201)
        .cookie("accesstoken", accesstoken, options)
        .cookie("refreshtoken", refreshtoken, options)
        .json(new ApiResponse(201, { createduser, accesstoken, refreshtoken }, "User registered successfully"));
});

const generateaccesandrefreshtoken = async (user_id) => {
    try {
        const user = await User.findById(user_id);
        const accesstoken = await user.generateaccesstoken();
        const refreshtoken = await user.generaterefreshtoken();
        user.refreshtoken = refreshtoken;
        await user.save({ validateBeforeSave: false });
        return { accesstoken, refreshtoken };
    } catch (error) {
        throw new Error("Error while generating tokens");
    }
};

export const loginUser = asynchandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json(new ApiResponse(400, {}, "Email and password are required"));
    }

    const user = await User.findOne({email});
   
    if (!user) {
        return res.status(401).json(new ApiResponse(401, {}, "Invalid email or password"));
    }   
    

    const validPassword = await user.isPasswordCorrect(password.trim());
   
    if (!validPassword) {
        return res.status(401).json(new ApiResponse(401, {}, "Invalid password"));
    }

    const { accesstoken, refreshtoken } = await generateaccesandrefreshtoken(user._id);

    const options = {
        httpOnly: true,
        secure: true,
    };

    res.status(200)
        .cookie("accesstoken", accesstoken, options)
        .cookie("refreshtoken", refreshtoken, options)
        .json(new ApiResponse(200, { user: user.toObject(), accesstoken, refreshtoken }, "Login successful"));
});


export const logoutUser = asynchandler(async (req, res) => {
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
        return res.status(400).json( new ApiResponse(500,{},"Something went wrong while logouting")
    )}
});

export const currentuser=asynchandler(async(req,res)=>{
    return res.status(200).json(
        new ApiResponse(200,req.user,"Current user fetched Successfully")
    )
})