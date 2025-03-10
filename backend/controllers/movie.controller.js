import { fetchFromTMDB } from "../services/tmdb.service.js";

const handleRequest = async (res, endpoint, successStatus = 200) => {
  try {
    const data = await fetchFromTMDB(endpoint);
    if (!data || (data.results && data.results.length === 0)) {
      return res.status(404).json({ success: false, message: "No content found" });
    }
    res.status(successStatus).json({ success: true, content: data.results ?? data });
  } catch (error) {
    console.error(`Error fetching data from TMDB:`, error.message);
    const status = error.message.includes("404") ? 404 : 500;
    res.status(status).json({
      success: false,
      message: status === 404 ? "Resource not found" : "Internal Server Error",
    });
  }
};

export const getTrendingMovies = async (req, res) => {
  try {
    const data = await fetchFromTMDB("trending/movie/day?language=en-US");
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ success: false, message: "No movies found" });
    }
    const anyMovie = data.results[Math.floor(Math.random() * data.results.length)];
    res.status(200).json({ success: true, content: anyMovie });
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong using the TMDB API" });
  }
};

export const getMovieTrailers = (req, res) => {
  handleRequest(res, `movie/${req.params.id}/videos?language=en-US`);
};

export const getMovieDetails = (req, res) => {
  handleRequest(res, `movie/${req.params.id}`);
};

export const getSimilarMovies = (req, res) => {
  handleRequest(res, `movie/${req.params.id}/similar`);
};

export const getMoviesByCategory = (req, res) => {
  handleRequest(res, `movie/${req.params.category}`);
};