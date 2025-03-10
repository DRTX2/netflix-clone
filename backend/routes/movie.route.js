import express from "express";
import { getTrendingMovies } from "../controllers/movie.controller.js";
export const movieRouter=express.Router();

movieRouter.get("/trending",getTrendingMovies);
// router.get("/",(req,res)=>{});
