import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCockies = (userId, res) => {
    const token=jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:"2h"});
    // payload, secret to encode or decode and the time for expiration
    res.cookie("jwt-netflix",token,{
        maxAge: 3 * 24 * 60 * 60 * 1000, // Convert "3d" to milliseconds
        httpOnly:true, //The cookie is only accessible by the server (prevents JavaScript access, increasing security). Prevents XSS (Cross-Site Scripting) attacks.
        sameSite:"strict", //ensures that the cookie is not sent when the request originates from a different site. This prevents Cross-Site Request Forgery (CSRF) attacks by making sure cookies are only sent in first-party requests.
        secure: ENV_VARS.NODE_ENV!== "development" 
        // Ensures cookie is only sent over HTTPS
    });
    return token;
};

