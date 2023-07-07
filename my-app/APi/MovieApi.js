import axios from "axios";

const myApi = "07c1b86f9670b68ff33569c9f863c6b2"
const ApiUrl = 'https://api.themoviedb.org/3';
const TopMovieUrl = `${ApiUrl}/movie/popular?api_key=${myApi}`
const FavMovie = `${ApiUrl}/account/20111946/favorite/movies`




const apiCall = async (endpoint) => {
    const options = {
        method: 'GET',
        url: endpoint,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2MxYjg2Zjk2NzBiNjhmZjMzNTY5YzlmODYzYzZiMiIsInN1YiI6IjY0YTU5OTQzZGExMGYwMDBmZmZlYTAyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xh6wfTJ2yxzvyoi8hmD4d1EQzYygjy4B1kkW5-mQN4E'
        }
    }

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }



}




export const GetTopMovie = () => {
    return apiCall(TopMovieUrl)
}

export const GetFavMovie = () => {
    return apiCall(FavMovie)
}

