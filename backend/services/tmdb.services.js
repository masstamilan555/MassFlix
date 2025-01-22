import axios from 'axios';

import { ENV_VARS } from '../config/envVars.js';

export const fetchFromTMDB = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json', 
            authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY,
        },
    };
    try {
        const response = await axios.get(url, options);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }

}
