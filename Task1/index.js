import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app=express();
app.use(cors(
    // {
    //     origin:"http://127.0.0.1:5500/Level1/Task1/index.html",
    //     credentials:true
    // }
));
app.use(bodyParser.json())
const port=3001;
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => {
	res.render("form", { title: "Dynamic Form Submission" });
});
app.post("/submit",(req,res)=>{

    const {name,email}=req.body;
    console.log(`Received form submission: Name - ${name}, Email - ${email}`);
    res.status(200).json({name:name,email:email});
});

try {
    app.listen(port,()=>{
        console.log("App is running at port",port)
    });
    
} catch (err) {
    console.log("Error while connecting to the server:  ",err.message);
}

