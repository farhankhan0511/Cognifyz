import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { z } from "zod";
import session from "express-session";

const app = express();
const port = 3002;
app.use(
    session({
      secret: 'your-secret-key', // Replace with a more secure key in production
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Use 'secure: true' if you're using HTTPS
    })
  );

app.use(
  cors({
    origin: "*", // Update with the correct frontend URL
    credentials: true,  
  })
);
app.use(bodyParser.json());

// Zod Schema for Validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(1, "Age must be greater than 0").max(100,"Age should be less than 100"),
  gender: z.enum(["male", "female", "other"]),
  comments: z.string().optional(),
  subscribe: z.boolean().optional(),
  rating: z.number().min(1).max(5).optional(),
});

app.post("/submit", (req, res) => {
  try {
    console.log(req.body)
    // Validate request body
    const validatedData = formSchema.parse(req.body);

    console.log("Validated Form Data:", validatedData);
    req.session.formData = validatedData;
    console.log(req.session)
    res.status(200).json({
      message: "Form submitted successfully!",
      data: validatedData,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Return validation errors
      res.status(400).json({
        message: "Validation error",
        errors: err.errors,
      });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});
app.get("/getFormData", (req, res) => {
    console.log(req.session.formData)
    console.log(req.session)

    if (req.session.formData) {
      res.status(200).json({
        message: "Session data retrieved successfully!",
        data: req.session.formData,
      });
    } else {
      res.status(404).json({
        message: "No session data found.",
      });
    }
  });

try {
  app.listen(port, () => {
    console.log("App is running at port", port);
  });
} catch (err) {
  console.log("Error while connecting to the server: ", err.message);
}
