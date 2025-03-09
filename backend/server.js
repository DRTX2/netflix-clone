import express from "express";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const port = ENV_VARS.PORT;

app.use(express.json()); // to parse the request body

app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
    connectDB();
});
