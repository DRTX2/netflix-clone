import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
  try {
    const options = {
      method: "GET",
      url,
      params: { language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`,
      },
    };

    const response = await axios.request(options);
    if (response.status !== 200)
      throw new Error(`Failed to fetch data from TMDB: ${response.statusText}`);

    return response.data;
  } catch (error) {
    console.error("TMDB API error:", error.message);
    throw new Error("TMDB API request failed");
  }
};
