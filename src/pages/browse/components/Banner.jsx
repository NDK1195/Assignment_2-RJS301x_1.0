import { useEffect, useState } from 'react';
import { requests } from '../../../api-endpoint';

export default function Banner() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(requests.fetchNetflixOriginals);
      const responseData = await response.json();

      const randomMovieData =
        responseData.results[
          Math.floor(Math.random() * responseData.results.length - 1)
        ];
      setData(randomMovieData);
    }
    fetchData();
  }, []);

  const imageURL = `https://image.tmdb.org/t/p/original/${data['backdrop_path']}`;
  return (
    <div className='-mt-[72px]'>
      <img src={imageURL} alt='Movie banner' className='w-full' />
      <div className='absolute left-0 hidden sm:block sm:top-1/4 lg:top-1/2 sm:w-1/2 lg:w-1/4 sm:-translate-y-1/4 lg:-translate-y-1/2 pl-5 text-white'>
        <h2 className='mb-10 text-4xl font-bold'>{data.name}</h2>
        <div className='mb-2 flex content-center flex-col sm:flex-row gap-2'>
          <button className='btn'>Play</button>
          <button className='btn'>My List</button>
        </div>
        <p className='custom-ellipsis'>{data.overview}</p>
      </div>
    </div>
  );
}
