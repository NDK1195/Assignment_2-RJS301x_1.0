import { useEffect, useState } from 'react';

export default function MovieList(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(props.apiEndpoint);
      const responseData = await response.json();

      setData(responseData.results);
    }
    fetchData();
  }, []);

  const imageURL = `https://image.tmdb.org/t/p/original/`;
  return (
    <div className='px-5 items-center'>
      {props.title !== 'Original' && (
        <h2 className='text-white font-bold text-2xl mb-5'>{props.title}</h2>
      )}
      <div className='flex overflow-x-auto overflow-y-hidden mb-12 pb-2 items-center '>
        {data.map(movie => (
          <img
            key={movie.id}
            src={`${imageURL}/${
              props.title === 'Original'
                ? movie['poster_path']
                : movie['backdrop_path']
            }`}
            alt='Movie backdrop'
            className='w-52 hover:scale-110 p-2 transition-all'
          />
        ))}
      </div>
    </div>
  );
}
