import dotenv from "dotenv";
dotenv.config();

export const ENV_VARS = {
  MONGO_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 9090,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  TMDB_API_KEY:process.env.TMDB_API_KEY,
};
