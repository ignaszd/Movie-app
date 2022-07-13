const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const YOUTUBE_BASE_URL = "https://www.youtube.com/watch";
const TMDB_API_KEY = "d97925da570b094d6568e5d0c4e3a587";

const ENDPOINTS = {
  TOP_RATED_MOVIES: "/movie/top_rated",
  GENRES: "/genre/movie/list",
  MOVIE: "/movie",
  UPCOMING_MOVIES: "/movie/upcoming",
  POPULAR_MOVIES: "/movie/popular",
};

const APPEND_TO_RESPONSE = {
  VIDEOS: "videos",
  RECOMMENDATIONS: "recommendations",
  SIMILAR: "similar",
};

export {
  TMDB_BASE_URL,
  TMDB_API_KEY,
  TMDB_IMAGE_BASE_URL,
  ENDPOINTS,
  APPEND_TO_RESPONSE,
  YOUTUBE_BASE_URL,
};
