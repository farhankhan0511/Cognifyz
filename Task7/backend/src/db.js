import mongoose from "mongoose"


export const connectDB=async()=>{
try {
    const connectionst=await mongoose.connect(`${process.env.MONGODB_URI}/netflix`)
    console.log(`${connectionst.connection.host}`)
} catch (error) {
    console.log("Error connecting to mongodb",error)
    process.exit(1);
}
}
