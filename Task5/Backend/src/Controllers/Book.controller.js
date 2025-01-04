import { bookings } from "../Models/Bookings.model.js";
import { Tourpackage } from "../Models/Tourpackage.model.js";
import { User } from "../Models/User.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import {z} from "zod"

const CustomerdetailsSchema=z.object({
    name:z.string().min(3,"Name is required"),
    age:z.number().int().positive(),
    gender:z.string(),
    phone:z.string().min(10).max(10)
})


const booktour=asynchandler(async(req,res)=>{
    try {
        console.log("Incoming Request:", req.body);
        const {id}=req.params;
        
        const user=req.user;
        const tour= await Tourpackage.findById(id);
        if(!tour || !tour.isPublic){
            return res.status(404).json( new ApiResponse(404,{},"Tour Package doesn't exists")
        )}
        const existingbooking=await bookings.findOne({BookedBy:user,Tourpackage:tour})
        if(existingbooking){
            console.log("Booking already exist")
            return res.status(400).json(new ApiResponse(400,{},"Booking already exists"))
            // return res.status(400).json( new ApiResponse(400,{},"Booking already exists")
           
        }
        
        const {NumberofTravellers,Customerdetails,specialrequest}=req.body;
        if(!(NumberofTravellers && Customerdetails)){
            return res.status(400).json( new ApiResponse(400,{},"Fill all the details")
        )}
        for (const [index, customer] of Customerdetails.entries()) {
            const result = CustomerdetailsSchema.safeParse(customer);
            if (!result.success) {
              const errorMessage = result.error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("; ");
              return res.status(400).json( new ApiResponse(400,{}, `Error in customer ${index + 1}: ${errorMessage}`)
          )  }
          }
        
    
        
        
    
        if(tour.Availability<NumberofTravellers){
            return res.status(204).json( new ApiResponse(204,{},"No Seats Available to Book")
        )}
    
        
    
       const Booking= await bookings.create({
            BookedBy:user,
            Tourpackage:tour,
            NumberofTravellers:NumberofTravellers,
            Customerdetails:Customerdetails,
            specialrequest:specialrequest
        })
        if(!Booking){
            return res.status(500).json( new ApiResponse(500,{},"Error while Booking the package")
        )}
        await Tourpackage.findByIdAndUpdate(
            tour._id,
            { $inc: { Availability: -NumberofTravellers } }
        );
        await User.findByIdAndUpdate(
            user._id,
            { $push: { Bookings: Booking } }
        );
        res.status(201).json(
            new ApiResponse(201,Booking,"Tour Booked Successfully")
        )
    
    }catch (error) {
        console.error(error);
        res.status(500).json(new ApiResponse(500,{},"Internal Server Error" ));
    }


})

export {booktour}