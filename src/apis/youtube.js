import axios from 'axios' ;

const KEY = 'AIzaSyBA2dSxHzmPm32Jm0Z5oqJM1HcSLtXNG7c' ;
// const KEY = 'AIzaSyDj_wb2R-l3eTD6Y5p1V42ixd8fJ_ZHT3o' ;

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


