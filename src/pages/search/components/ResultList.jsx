import { useEffect, useState, createRef, Fragment } from 'react';
import MovieDetail from '../../../components/MovieDetail';

export default function ResultList(props) {
  const [data, setData] = useState([]);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [movieDetail, setMovieDetail] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${props.apiEndpoint}&query=${props.query}`);
      const responseData = await response.json();

      setData(responseData.results);
    }
    fetchData();
  }, [props.query]);

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

  const imageURL = `https://image.tmdb.org/t/p/original/`;

  const resultList = data.map(movie => {
    const ref = createRef();

    function handleScrollIntoTopOfModal() {
      ref.current.scrollIntoView({
        behavior: 'smooth',
      });
    }

    return (
      <Fragment key={movie.id}>
        <div className='w-48'>
          <img
            src={`${imageURL}/${movie['poster_path']}`}
            alt='Movie poster'
            className='w-full hover:scale-105 transition-all hover:cursor-pointer'
            onClick={() => {
              handleScrollIntoTopOfModal();
              handleGetDetail(movie);
            }}
            ref={ref}
          />
          {selectedMovie === movie && isShowDetail ? (
            <MovieDetail movieData={movieDetail} />
          ) : null}
        </div>
      </Fragment>
    );
  });

  return (
    <>
      <div className='px-5 h-screen'>
        <h2 className='text-white font-bold text-2xl mb-5'>Search Result</h2>
        <div className='grid grid-cols-auto-fit gap-3 bg-[#111] relative'>
          {data.length === 0 ? (
            <h3 className='text-center text-white text-2xl font-bold'>
              No result found
            </h3>
          ) : null}
          {resultList}
        </div>
      </div>
    </>
  );
}
