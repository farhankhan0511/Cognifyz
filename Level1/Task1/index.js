import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
const app=express();
app.use(cors(
    // {
    //     origin:"http://127.0.0.1:5500/Level1/Task1/index.html",
    //     credentials:true
    // }
));
app.use(bodyParser.json())
const port=3001;

app.post("/submit",(req,res)=>{

    const {name,email}=req.body;
    console.log(`Received form submission: Name - ${name}, Email - ${email}`);
    res.status(200).send("Form submitted successfully!");
});

try {
    app.listen(port,()=>{
        console.log("App is running at port",port)
    });
    
} catch (err) {
    console.log("Error while connecting to the server:  ",err.message);
}

