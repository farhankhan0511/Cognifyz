
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"



const AdminSchema=new Schema({
    adminname:{
        type:String,
        lowercase:true,
        required:[true,"username is required"],
        unique:true,
        trim:true,
        index:true,

    },
    Name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    Image:{
        type:String
    },
    
    password:{
        type:String,
        required:[true,"Password is required"]

    },
    refreshtoken:{
        type:String
    }

},{timestamps:true})

UserSchema.pre("save",async function (next) {
    if (!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password,10)
    next()
    
})
UserSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateaccesstoken=async function () {
    return jwt.sign({
        _id:this._id,
        username:this.username
    },process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}
UserSchema.methods.generaterefreshtoken=async function () {
    return jwt.sign({
        _id:this._id,
        username:this.username
    },process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User=mongoose.model("User",UserSchema)