import { User } from '../models/user.model.js';
import { fetchFromTMDB } from '../services/tmdb.services.js';


export async function searchPerson(req, res) {
    try {
        const query = req.params.query;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).send(null)

        }
        await User.findByIdAndUpdate(req.user._id, {     //res.user._id is from protected route middleware
            $push: {
                searchHistory: {                //push is used to add new item to the array
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: 'person',
                    createdAt: new Date()
                }
            }
        }
        

    )
    res.status(200).json({ content: response.results });
}
    catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.log(error);

}

}


export async function searchMovie(req, res) {
    try {
        const query = req.params.query;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).send(null)

        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: 'movie',
                    createdAt: new Date()
                }
            }
        }
        

    )
    res.status(200).json({ content: response.results });
}
    catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.log(error);

}

}

export async function searchTv(req, res) {  
    try {
        const query = req.params.query;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).send(null)

        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: 'tv',
                    createdAt: new Date()
                }
            }
        }
        

    )
    res.status(200).json({ content: response.results });
}
    catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.log(error);

}

}


export async function getSearchHistory(req, res) {
    try {
        res.status(200).json({ content: req.user.searchHistory });   //res.user is from protected route middleware
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        console.log(error);

    }
}

export async function removeItemFromSearchHistory(req, res) {
    try {
        let id = req.params.id;
        id = parseInt(id);      //we need to convert id to integer because id is stored as integer in the database

        await User.findByIdAndUpdate(req.user._id, {
            $pull: {                    //pull is used to remove an item from the array
                searchHistory: {
                    id: id
                }
            }
        }
    )
    res.status(200).json({ message: 'Item removed from search history' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        console.log(error);
    }

}