import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB=async ()=>{
    try{
        const conn=await mongoose.connect(ENV_VARS.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongodb connected succesfull. \nHost: "+conn.connection.host);

    }catch(error){
        console.error("Error in the mongob connection: "+ error);
        process.exit(1);// like bash scrypts
    }
}