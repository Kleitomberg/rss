import axios from 'axios';

export default (urlFeed) => {
    //TODO check if we need headers later
    const api = axios.create({
        baseURL: urlFeed
    });

    return api;
};