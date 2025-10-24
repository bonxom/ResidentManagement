import "dotenv/config";
import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import permissionRoutes from "./routes/permissionRoutes.js";

const PORT = process.env.PORT;

console.log("Hello");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

await connectDB();
console.log("Connected to Database");

app.use("/api/permissions", permissionRoutes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

export default app;