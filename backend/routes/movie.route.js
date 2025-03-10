import express from "express";
import { getMovieDetails, getMovieTrailers, getTrendingMovies } from "../controllers/movie.controller.js";
export const movieRouter=express.Router();

movieRouter.get("/trending",getTrendingMovies);
movieRouter.get("/:id/trailers",getMovieTrailers);
movieRouter.get("/:id/details",getMovieDetails);
