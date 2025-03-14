import express from "express";
import {
  getSimilarTvShow,
  getTrendingTvShow,
  getTvShowByCategory,
  getTvShowDetails,
  getTvShowTrailers,
} from "../controllers/tvShow.controller.js";

export const tvShowRoutes = express.Router();

tvShowRoutes.get("/trending", getTrendingTvShow);
tvShowRoutes.get("/:id/trailers", getTvShowTrailers);
tvShowRoutes.get("/:id/details", getTvShowDetails);
tvShowRoutes.get("/:id/similar", getSimilarTvShow);
tvShowRoutes.get("/:category", getTvShowByCategory);