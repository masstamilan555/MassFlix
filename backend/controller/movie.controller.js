import { fetchFromTMDB } from "../services/tmdb.services.js";


export async function getTrendingMovies(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US")
        
        const randomMovie=data?.results[Math.floor(Math.random() * data.results?.length)];
        res.json({content:randomMovie});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
    }


export async function getMovieTrailer(req, res) {
    try {
        const id = req.params.id
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.json({trailers:data.results});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
    }

export async function getMovieDetails(req, res) {
    try {
        const id = req.params.id
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.json({content:data});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
    }

export async function getSimilarMovies(req, res) {
    try {
        const id = req.params.id
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.json({similar:data.results});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
    }

export async function getMoviesByCategory(req, res) {
    try {
        const category = req.params.category
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.json({content:data.results});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
    }