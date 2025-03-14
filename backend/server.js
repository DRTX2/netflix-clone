import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

import { authRoutes } from "./routes/auth.route.js";
import { movieRoutes } from "./routes/movie.route.js";
import { tvShowRoutes } from "./routes/tvShow.route.js";
import { protectRoute } from "./middleware/protectRoute.js";
import cookieParser from "cookie-parser";

const app = express();
const port = ENV_VARS.PORT;

app.use(express.json()); // to parse the request body
app.use(cookieParser()); // to parse coockies from the request body
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvShowRoutes);
app.use("/api/v1/tv", protectRoute, searchRou);

app.listen(port, () => {
  console.log(`[OK] Server started at http://localhost:${port}`);
  connectDB();
});
