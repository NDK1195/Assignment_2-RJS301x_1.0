import { useEffect, useRef, useState } from 'react';
import MovieDetail from '../../../components/MovieDetail';

export default function MovieList(props) {
  const [data, setData] = useState([]);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [movieDetail, setMovieDetail] = useState({});
  const movieListWrapper = useRef();

  useEffect(() => {
    const movieListWrapperEl = movieListWrapper.current;

    // Add horizontal scroll using mouse wheel to movie list
    function onScrollWheel(event) {
      if (event.deltaY === 0) {
        return;
      }
      event.preventDefault();
      movieListWrapperEl.scrollBy(event.deltaY, 0);
    }

    movieListWrapperEl.addEventListener('wheel', onScrollWheel);

    return () => {
      movieListWrapperEl.removeEventListener('wheel', onScrollWheel);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(props.apiEndpoint);
      const responseData = await response.json();
      console.log(responseData);
      setData(responseData.results);
    }
    fetchData();
  }, []);

  function handleGetDetail(movie) {
    setIsShowDetail(!isShowDetail);
    setMovieDetail(movie);
  }

  const movieListTitle = props.title !== 'Original' && (
    <h2 className='text-white font-bold text-2xl mb-5'>{props.title}</h2>
  );

  const imageURL = `https://image.tmdb.org/t/p/original/`;

  const movieList = data.map(movie => (
    <img
      key={movie.id}
      src={`${imageURL}/${
        props.title === 'Original'
          ? movie['poster_path']
          : movie['backdrop_path']
      }`}
      alt='Movie backdrop'
      className='w-52 hover:scale-110 p-2 transition-all cursor-pointer'
      onClick={() => handleGetDetail(movie)}
    />
  ));

  return (
    <>
      <div className='px-5 items-center mt-10'>
        {movieListTitle}
        <div
          className='flex overflow-x-auto overflow-y-hidden mb-4 pb-2 items-center '
          ref={movieListWrapper}
        >
          {movieList}
        </div>
      </div>
      <div className='relative'>
        {isShowDetail && <MovieDetail movieData={movieDetail} />}
      </div>
    </>
  );
}
