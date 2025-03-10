import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovies(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    if(!data.results || data.results.length===0)
        return res.status(404).json({success:false,message:"No movies found"});
    const anyMovie =
      data.results[Math.floor(Math.random() * data.results.length)];

    res.status(200).json({ success: true, content: anyMovie });
  } catch (error) {
    console.error("Error fetching trending movies:",error.message);
    res.status(500).json({ success: false, message:"Something went wrong using the TMBD API" });
  }
}
