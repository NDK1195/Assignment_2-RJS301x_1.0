const API_KEY = '6f965695255935d227d271a48747dd38';
const url = 'https://api.themoviedb.org/3';
const requests = {
  fetchTrending: `${url}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${url}/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `${url}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${url}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `${url}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `${url}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `${url}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `${url}/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `${url}/search/movie?api_key=${API_KEY}&language=en-US`,
};

export { requests };
