import "dotenv/config";
import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import permissionRoutes from "./routes/permissionRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 
import { errorHandler } from "./middleware/errorHandler.js";
import householdRoutes from "./routes/householdRoutes.js";
import { defaultInit } from "./config/initialize.js";

const PORT = process.env.PORT;

console.log("Hello");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

await connectDB();
console.log("Connected to Database");

await defaultInit();

app.use("/permissions", permissionRoutes);
app.use("/roles", roleRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/households", householdRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

export default app;
