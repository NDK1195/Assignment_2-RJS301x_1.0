import { createRef, useEffect, useRef, useState } from 'react';
import MovieDetail from '../../../components/MovieDetail';

export default function MovieList(props) {
  const [data, setData] = useState([]);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [movieDetail, setMovieDetail] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);
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

      setData(responseData.results);
    }
    fetchData();
  }, []);

  function handleGetDetail(movie) {
    setMovieDetail(movie);

    // check if click on same movie
    // if click on same movie, toggle movie detail modal
    // if not, keep modal, set content to clicked movie
    if (movie.id === selectedMovie?.id) {
      setIsShowDetail(!isShowDetail);
    } else {
      setSelectedMovie(movie);
      setIsShowDetail(true);
    }
  }

  const movieListTitle =
    props.title !== 'Original' ? (
      <h2 className='text-white font-bold text-2xl mb-5'>{props.title}</h2>
    ) : null;

  const imageURL = `https://image.tmdb.org/t/p/original/`;

  const movieList = data.map(movie => {
    const ref = createRef();

    function handleScrollIntoTopOfModal() {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return (
      <img
        key={movie.id}
        src={`${imageURL}/${
          props.title === 'Original'
            ? movie['poster_path']
            : movie['backdrop_path']
        }`}
        alt='Movie backdrop'
        className='w-52 hover:scale-110 p-2 transition-all hover:cursor-pointer'
        onClick={() => {
          handleScrollIntoTopOfModal();
          handleGetDetail(movie);
        }}
        ref={ref}
      />
    );
  });

  return (
    <>
      <div className='px-5 items-center mt-10'>
        {movieListTitle}
        <div
          className='flex overflow-x-auto overflow-y-hidden pb-1 items-center '
          ref={movieListWrapper}
        >
          {movieList}
        </div>
      </div>
      <div className='relative'>
        {isShowDetail ? <MovieDetail movieData={movieDetail} /> : null}
      </div>
    </>
  );
}
