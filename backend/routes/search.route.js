import express from "express";
import {
  searchMovie,
  searchPerson,
  searchTv,
} from "../controllers/search.controller.js";

export const searchRoutes = express.Router();

searchRoutes.get("/person/:query", searchPerson);
searchRoutes.get("/movie/:query", searchMovie);
searchRoutes.get("/tv/:query", searchTv);
