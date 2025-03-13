import { fetchFromTMDB } from "../services/tmdb.service.js";
import { handleRequest } from "./movie.controller.js";

export async function getTrendingTvShow(req, res) {
  try {
    const data = await fetchFromTMDB("trending/tv/day?language=en-US");
    if (!data.results || data.results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No tv show found" });
    }
    const anyMovie =
      data.results[Math.floor(Math.random() * data.results.length)];
    res.status(200).json({ success: true, content: anyMovie });
  } catch (error) {
    console.error("Error fetching trending tv shows:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong using the TMDB API",
      });
  }
}

export const getTvShowTrailers = (req, res) => {
  handleRequest(res, `tv/${req.params.id}/videos`);
};

export const getTvShowDetails = (req, res) => {
  handleRequest(res, `tv/${req.params.id}`);
};

export const getSimilarTvShow = (req, res) => {
  handleRequest(res, `tv/${req.params.id}/similar`);
};

export const getTvShowByCategory = (req, res) => {
  handleRequest(res, `tv/${req.params.category}`);
};
