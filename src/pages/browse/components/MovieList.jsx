import { useEffect, useState } from 'react';

export default function MovieList(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(props.apiEndpoint);
      const responseData = await response.json();
      console.log(responseData);
      setData(responseData.results);
    }
    fetchData();
  }, []);

  const imageURL = `https://image.tmdb.org/t/p/original/`;
  return (
    <div className='px-5 items-center'>
      {props.title !== 'Original' && <h2>{props.title}</h2>}
      <div className='flex overflow-x-auto overflow-y-hidden'>
        {data.map(movie => (
          <img
            key={movie.id}
            src={`${imageURL}/${
              props.title === 'Original'
                ? movie['poster_path']
                : movie['backdrop_path']
            }`}
            className='w-52 hover:scale-105 p-1 transition-all'
          />
        ))}
      </div>
    </div>
  );
}
