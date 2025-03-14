import axios from "axios";
import { User } from "../models/user.model.js";
import { getRequestOptions, fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req, res) {
  const { query } = req.params;

  try {
    if (!query || query.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Query cannot be empty" });
    }

    const requestOptions = getRequestOptions(
      `search/person?query=${encodeURIComponent(query)}&include_adult=false`
    );
    const response = await axios.request(requestOptions);
    const results = response.data.results;
    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No results found" });
    }

    const userId = req.user?._id;
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          searchHistory: {
            id: results[0].id,
            image: results[0].profile_path || "",
            title: results[0].name,
            searchType: "person",
            createdAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({ success: true, content: results });
  } catch (error) {
    console.error("Error in searchPerson controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
// I need refactor these methods because axios always give me an response.data it's not an error in fetchTMDB function

export async function searchMovie(req, res) {
  const { query } = req.params;

  try {
    if (!query || query.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Query cannot be empty" });
    }

    const requestOptions = getRequestOptions(
      `search/movie?query=${encodeURIComponent(query)}&include_adult=false`
    );
    const response = await axios.request(requestOptions);
    const results = response.data.results;
    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No results found" });
    }

    const userId = req.user?._id;
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          searchHistory: {
            id: results[0].id,
            image: results[0].poster_path || "",
            title: results[0].title,
            searchType: "movie",
            createdAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({ success: true, content: results });
  } catch (error) {
    console.log("Error in searchMovie controller: " + error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function searchTv(req, res) {
  const { query } = req.params;

  try {
    if (!query || query.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Query cannot be empty" });
    }

    const requestOptions = getRequestOptions(
      `search/tv?query=${encodeURIComponent(query)}&include_adult=false`
    );
    const response = await axios.request(requestOptions);
    const results = response.data.results;
    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No results found" });
    }

    const userId = req.user?._id;
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          searchHistory: {
            id: results[0].id,
            image: results[0].poster_path || "",
            title: results[0].title,
            searchType: "movie",
            createdAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({ success: true, content: results });
  } catch (error) {
    console.log("Error in searchMovie controller: " + error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function removeItemFromSearchHistory(req, res) {
  let { id } = req.params;

  id = parseInt(id);

  try {
    const user = User.findById(req.user._id);
    const item = user.searchHistory.some((item) => (item.id = id));

    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found in search history" });

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id },
      },
    });
    res
      .status(200)
      .json({ success: true, message: "Item removed from search history" });
  } catch (error) {
    console.log("[ERROR] From removeItemFromSearchHistory: " + error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
