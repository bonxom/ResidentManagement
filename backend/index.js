import "dotenv/config";
import connectDB from "./config/db.js";


console.log("Hello")

await connectDB();

console.log("Connected to Database")
