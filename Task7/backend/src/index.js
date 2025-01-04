import 'dotenv/config';
import app from './app.js';
import { connectDB } from './db.js';


// Connect MongoDB

connectDB()
.then(
   ()=>{
    app.listen(process.env.PORT||5000,()=>{
        console.log("running")
    })
   }
)
.catch((err)=>{console.log("Mongodb not connected",err)})
