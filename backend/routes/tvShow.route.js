import express from "express";
import {
  getSimilarTvShow,
  getTrendingTvShow,
  getTvShowByCategory,
  getTvShowDetails,
  getTvShowTrailers,
} from "../controllers/tvShow.controller.js";

export const tvShowRouter = express.Router();

tvShowRouter.get("/trending", getTrendingTvShow);
tvShowRouter.get("/:id/trailers", getTvShowTrailers);
tvShowRouter.get("/:id/details", getTvShowDetails);
tvShowRouter.get("/:id/similar", getSimilarTvShow);
tvShowRouter.get("/:category", getTvShowByCategory);