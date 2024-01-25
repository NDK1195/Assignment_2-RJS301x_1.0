import { useEffect, useRef, useState } from 'react';

export default function MovieList(props) {
  const [data, setData] = useState([]);
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
      className='w-52 hover:scale-110 p-2 transition-all hover:cursor-pointer'
    />
  ));

  return (
    <div className='px-5 items-center'>
      {movieListTitle}
      <div
        className='flex overflow-x-auto overflow-y-hidden mb-12 pb-2 items-center'
        ref={movieListWrapper}
      >
        {movieList}
      </div>
    </div>
  );
}
