import { fetchFromTMDB } from "../services/tmdb.service";

export async function searchPerson(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `search/person?query=${query}include_adult=false`
    );
    if (response.results.length === 0) return res.status(404).end(); // send (null) =>null as the body request or just end
    res.status(200).json({ success: true, content: response.results });
  } catch (errpr) {
    console.log("Error in searchPerson controller");
    res.status(500).json({success:false,message:"Internal Server Error"})
  }
}

export async function searchMovie(req, res) {}

export async function searchTv(req, res) {}
