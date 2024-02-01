import NavBar from '../../components/NavBar';
import Banner from './components/Banner';
import MovieList from './components/MovieList';
import { requests } from '../../api-endpoint';

function Browse() {
  return (
    <div className='pb-5'>
      <NavBar />
      <Banner />
      <MovieList
        title='Original'
        apiEndpoint={requests.fetchNetflixOriginals}
      />
      <MovieList title='Xu hướng' apiEndpoint={requests.fetchTrending} />
      <MovieList title='Xếp hạng cao' apiEndpoint={requests.fetchTopRated} />
      <MovieList title='Hành động' apiEndpoint={requests.fetchActionMovies} />
      <MovieList title='Hài' apiEndpoint={requests.fetchComedyMovies} />
      <MovieList title='Kinh dị' apiEndpoint={requests.fetchHorrorMovies} />
      <MovieList title='Lãng mạn' apiEndpoint={requests.fetchRomanceMovies} />
      <MovieList title='Tài liệu' apiEndpoint={requests.fetchDocumentaries} />
    </div>
  );
}

export default Browse;
