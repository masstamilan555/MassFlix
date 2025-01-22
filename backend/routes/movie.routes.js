import express from 'express';
import { getMovieDetails, getMoviesByCategory, getMovieTrailer, getSimilarMovies, getTrendingMovies } from '../controller/movie.controller.js';

const router = express.Router();

router.get('/trending', getTrendingMovies);
router.get("/:id/trailers", getMovieTrailer);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);

export default router;