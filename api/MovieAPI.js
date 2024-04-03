import axios from "axios";
import { API_KEY } from "../constant";

const apiBaseURL = 'https://api.themoviedb.org/3'
const trendingMovieEndPoint = `${apiBaseURL}/trending/all/day?api_key=${API_KEY}`
const topRatedMoviesEndPoint = `${apiBaseURL}/movie/top_rated?api_key=${API_KEY}`
const upcomingMoviesEndPoint = `${apiBaseURL}/movie/upcoming?api_key=${API_KEY}`

//dyanmic endpoint
const movieDetailEndPoint = id => `${apiBaseURL}/movie/${id}?api_key=${API_KEY}`
const movieCreditsEndPoint = id => `${apiBaseURL}/movie/${id}/credits?api_key=${API_KEY}`
const movieSimilarEndPoint = id => `${apiBaseURL}/movie/${id}/recommendations?api_key=${API_KEY}`
const movieVideoEndPoint = id => `${apiBaseURL}/movie/${id}/videos?api_key=${API_KEY}`

const personDetailsEndpoint = id => `${apiBaseURL}/person/${id}?api_key=${API_KEY}`
const personMoviesEndpoint = id => `${apiBaseURL}/person/${id}/movie_credits?api_key=${API_KEY}`

const searchMovieEndPoint = `${apiBaseURL}/search/multi?api_key=${API_KEY}`

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500/${path}`:null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342/${path}`:null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185/${path}`:null;

const api_call = async (endpoint,params) =>{
    const options = {
        method:'GET',
        url:endpoint,
        params: params?params:{}
    }

    try{
        const response = await axios.request(options)
        return response.data;
    }
    catch(error){
        console.log(error)
        return{}
    }
}

export const fetchTrendingMovies = () =>{
    return api_call(trendingMovieEndPoint)
}

export const fetchUpcomingMovies = (params) =>{
    return api_call(upcomingMoviesEndPoint,params)
}

export const fetchTopRatedMovies = (params) =>{
    return api_call(topRatedMoviesEndPoint,params)
}

export const fetchMovieDetails = (id) =>{
    return api_call(movieDetailEndPoint(id))
}

export const fetchMovieCredits = (id) =>{
    return api_call(movieCreditsEndPoint(id))
}

export const fetchSimilarMovies= (id) =>{
    return api_call(movieSimilarEndPoint(id))
}

export const fetchPersonDetails= (id) =>{
    return api_call(personDetailsEndpoint(id))
}

export const fetchPersonMovies= (id) =>{
    return api_call(personMoviesEndpoint(id))
}

export const fetchMovieVideo= (id) =>{
    return api_call(movieVideoEndPoint(id))
}

export const fetchSearchMovies = (params) =>{
    return api_call(searchMovieEndPoint,params)
}


/// TV SHOW
const topRatedShowsEndPoint = `${apiBaseURL}/tv/top_rated?api_key=${API_KEY}`
const showVideoEndPoint = id => `${apiBaseURL}/tv/${id}/videos?api_key=${API_KEY}`
const showDetailEndPoint = id => `${apiBaseURL}/tv/${id}?api_key=${API_KEY}`
const showCreditsEndPoint = id => `${apiBaseURL}/tv/${id}/credits?api_key=${API_KEY}`
const showSimilarEndPoint = id => `${apiBaseURL}/tv/${id}/recommendations?api_key=${API_KEY}`
const seasonDetailEndpoint = (id,season_number) => `${apiBaseURL}/tv/${id}/season/${season_number}?api_key=${API_KEY}`


export const fetchTopRateShows = (params) =>{
    return api_call(topRatedShowsEndPoint,params)
}
export const fetchShowDetails = (id) =>{
    return api_call(showDetailEndPoint(id))
}
export const fetchShowVideo= (id) =>{
    return api_call(showVideoEndPoint(id))
}
export const fetchShowCredits = (id) =>{
    return api_call(showCreditsEndPoint(id))
}
export const fetchSimilarShows= (id) =>{
    return api_call(showSimilarEndPoint(id))
}
export const fetchSeasonDetail = (id,season_number) => {
    return api_call(seasonDetailEndpoint(id,season_number))
}