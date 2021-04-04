import axios from 'axios' ;

const KEY = <YOUR YOUTUBE API KEY> ;

export const search = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        key: KEY,
        maxResults:10
    }
});

export const video = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params : {
        key: KEY,
    }
});


