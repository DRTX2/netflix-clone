import dotenv from "dotenv";
dotenv.config();

export const ENV_VARS ={
    MONGO_URI:process.env.MONGODB_URI,
    PORT: process.env.PORT || 9090, 
}