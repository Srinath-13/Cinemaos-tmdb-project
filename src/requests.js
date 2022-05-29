const API_KEY = "d7f9c6e71e7e86cb66d0ce3838da986a";
let rand = Math.floor(Math.random() * 50) + 1;
let rannd = Math.floor(Math.random() * 5) + 1;
const requests = {
    fetchTrending: `/trending/movie/week?api_key=${API_KEY}`,
    fetchOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&include_adult=false`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&page=${rand}&include_adult=false&language=de`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&page=${rand}&include_adult=false`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&page=${rand}&include_adult=false`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&include_adult=false&page=${rand}`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99&page=${rand}&include_adult=false`,
    fetchSearch: `/search/multi?api_key=${API_KEY}&query=`,
    fetchSort: `/discover/movie?api_key=${API_KEY}&with_genres=`,
    fetchMovie: `/movie/`,
    fetchAPI: `?api_key=${API_KEY}`,
    fetchGeneral: `/discover/movie?api_key=${API_KEY}&include_adult=false`,
    fetchSimilar: `/similar?api_key=${API_KEY}`,
    fetchRecommendations: `/recommendations?api_key=${API_KEY}`,
    fetchDiscover: `/discover/movie?api_key=${API_KEY}`
}
export default requests;