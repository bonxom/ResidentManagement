import "dotenv/config";
import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import permissionRoutes from "./routes/permissionRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 
import feeRoutes from "./routes/feeRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import householdRoutes from "./routes/householdRoutes.js";
import { defaultInit } from "./config/initialize.js";
import requestRoutes from "./routes/requestRoutes.js";

const rawPort = process.env.PORT;
const PORT = rawPort ? Number(rawPort) : 3000;
if (!Number.isInteger(PORT) || PORT <= 0 || PORT >= 65536) {
  throw new Error("Invalid PORT environment variable");
}

console.log("Hello");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

await connectDB();
console.log("Connected to Database");

await defaultInit();

app.use("/api/permissions", permissionRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/households", householdRoutes);
app.use("/api/requests", requestRoutes);

app.use("/api/fees", feeRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/stats", statsRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

export default app;
