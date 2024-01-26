import { useEffect, useState } from 'react';

export default function ResultList(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${props.apiEndpoint}&query=${props.query}`);
      const responseData = await response.json();

      setData(responseData.results);
    }
    fetchData();
  }, [props.query]);

  const imageURL = `https://image.tmdb.org/t/p/original/`;

  const resultList = data.map(movie => (
    <img
      key={movie.id}
      src={`${imageURL}/${movie['poster_path']}`}
      alt='Movie poster'
      className='w-48 hover:scale-105 transition-all hover:cursor-pointer'
    />
  ));

  return (
    <div className='px-5 bg-[#111] h-screen'>
      <h2 className='text-white font-bold text-2xl mb-5'>Search Result</h2>
      <div className='grid grid-cols-auto-fit gap-3 bg-[#111]'>
        {resultList}
      </div>
    </div>
  );
}
