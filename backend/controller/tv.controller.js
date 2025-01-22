import { fetchFromTMDB } from "../services/tmdb.services.js";


export async function getTrendingTv(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US")
        const randomMovie=data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({content:randomMovie});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
    }


export async function getTvTrailer(req, res) {
    try {
        const id = req.params.id
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.json({trailers:data.results});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
    }

export async function getTvDetails(req, res) {
    try {
        const id = req.params.id
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.json({content:data});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
    }

export async function getSimilarTv(req, res) {
    try {
        const id = req.params.id
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.json({similar:data.results});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
    }

export async function getTvByCategory(req, res) {
    try {
        const category = req.params.category
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.json({content:data.results});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
    }