import express from "express";
import {
  getMovieDetails,
  getMoviesByCategory,
  getMovieTrailers,
  getSimilarMovies,
  getTrendingMovies,
} from "../controllers/movie.controller.js";
export const movieRoutes = express.Router();

movieRoutes.get("/trending", getTrendingMovies);
movieRoutes.get("/:id/trailers", getMovieTrailers);
movieRoutes.get("/:id/details", getMovieDetails);
movieRoutes.get("/:id/similar", getSimilarMovies);
movieRoutes.get("/:category", getMoviesByCategory);
