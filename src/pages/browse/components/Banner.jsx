import { useEffect, useState } from 'react';
import { requests } from '../../../api-endpoint';

export default function Banner() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(requests.fetchNetflixOriginals);
      const responseData = await response.json();

      // get random movie data from response data array
      const randomMovieData =
        responseData.results[
          Math.floor(Math.random() * (responseData.results.length - 1))
        ];
      console.log(randomMovieData);
      setData(randomMovieData);
    }
    fetchData();
  }, []);

  const imageURL = 'https://image.tmdb.org/t/p/original';

  const movieBanner = data['backdrop_path'] ? (
    <img
      src={`${imageURL}/${data['backdrop_path']}`}
      alt='Movie banner'
      className='w-full'
    />
  ) : (
    <div className='bg-black h-dvh'></div>
  );

  return (
    <div className='-mt-[72px] mb-10'>
      {movieBanner}
      <div className='absolute left-0 hidden sm:block sm:top-1/4 lg:top-1/2 sm:w-1/2 lg:w-1/4 sm:-translate-y-1/4 lg:-translate-y-1/2 pl-5 text-[#dddada]'>
        <h2 className='mb-8 text-4xl font-bold'>{data.name}</h2>
        <div className='mb-3 flex content-center flex-col sm:flex-row gap-2'>
          <button className='btn'>Play</button>
          <button className='btn'>My List</button>
        </div>
        <p className='custom-ellipsis'>{data.overview}</p>
      </div>
    </div>
  );
}
