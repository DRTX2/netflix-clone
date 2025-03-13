import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

import { authRouter } from "./routes/auth.route.js";
import { movieRouter } from "./routes/movie.route.js";
import { tvShowRouter } from "./routes/tvShow.route.js";

const app = express();
const port = ENV_VARS.PORT;

app.use(express.json()); // to parse the request body

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movie", movieRouter);
app.use("/api/v1/movie", tvShowRouter);

app.listen(port, () => {
  console.log(`[OK] Server started at http://localhost:${port}`);
  connectDB();
});
