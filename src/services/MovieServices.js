const axios = require("axios").default
import {
    TMDB_BASE_URL,
    TMDB_API_KEY,
    TMDB_IMAGE_BASE_URL,
    ENDPOINTS,
} from "../constants/Urls";
import LANGUAGES from "../constants/Languages";

const TMDB_HTTP_REQUEST = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    },
});

const getTopRatedMovies = () =>
  TMDB_HTTP_REQUEST.get(ENDPOINTS.TOP_RATED_MOVIES);

const getMovieId = (movieId) =>
 TMDB_HTTP_REQUEST.get(`${ENDPOINTS.MOVIE}/${movieId}`);

const getAllGenres = () =>
  TMDB_HTTP_REQUEST.get(ENDPOINTS.GENRES);  

const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;

const getLanguage = (language_iso) =>
 LANGUAGES.find((language) => language.iso_639_1 === language_iso);

export {getTopRatedMovies, getPoster, getLanguage, getAllGenres, getMovieId};