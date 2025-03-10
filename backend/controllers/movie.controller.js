import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovies(req, res) {
  try {
    const data = await fetchFromTMDB("trending/movie/day?language=en-US");
    if (!data.results || data.results.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "No movies found" });
    const anyMovie =
      data.results[Math.floor(Math.random() * data.results.length)];

    res.status(200).json({ success: true, content: anyMovie });
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong using the TMBD API",
    });
  }
}

export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(`movie/${id}/videos?language=en-US`);
    res.json({ success: true, content: data.results });
  } catch (error) {
    if (error.message.includes("404")) return res.status(404).send(null);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(`movie/${id}`);
    res.json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) return res.status(404).send(null);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function getSimilarMovies(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(`movie/${id}/similar`);
    res.json({success:true,content:data.results});
  } catch (error) {
    if (error.message.includes("404")) return res.status(404).send(null);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMoviesByCategory(req,res){
  const {category}=req.body;
  try {
    const data = await fetchFromTMDB(`movie/${category}`);
    res.status(200).json({success:true, content:data.results})
  } catch (error) {
    if (error.message.includes("404")) return res.status(404).send(null);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}