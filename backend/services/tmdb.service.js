import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const BASE_API_URL='https://api.themoviedb.org/3/';

export const options = {
  method: "GET",
  url: BASE_API_URL, // Definir baseURL en lugar de url
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`,
  },
};


export const getRequestOptions = (endpoint, moreOptions = {}) => {
  return {
    ...options, // Clonamos las opciones base
    ...moreOptions, // Fusionamos opciones adicionales si existen
    url: `${options.url}${endpoint}`, // Concatenamos la URL base con el endpoint
  };
};

export const fetchFromTMDB = async (endpoint, moreOptions = {}) => {
  try {
    const requestOptions = getRequestOptions(endpoint, moreOptions); // Obtener opciones modificadas
    const response = await axios.request(requestOptions);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch data from TMDB: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error("[ERROR] TMDB API error:", error.message);
    throw new Error("TMDB API request failed");
  }
};
