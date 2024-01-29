import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const opts = {
  height: '500px',
  width: '100%',
  playerVars: {
    autoplay: 0,
  },
};

export default function MovieDetail(props) {
  const [movieVideo, setMovieVideo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${props.movieData.id}/videos?api_key=6f965695255935d227d271a48747dd38`
      );
      const responseData = await response.json();

      // get trailer or teaser from response data
      const result = responseData.results.filter(
        video =>
          video.site === 'YouTube' &&
          (video.type === 'Trailer' || video.type === 'Teaser')
      );
      setMovieVideo(result);
    }
    fetchData();
  }, []);

  let videoContent;

  if (movieVideo.length > 0) {
    videoContent = <YouTube videoId={movieVideo[0].key} opts={opts} />;
  } else {
    videoContent = (
      <img
        src={`https://image.tmdb.org/t/p/original/${props.movieData['backdrop_path']}`}
        alt='Movie backdrop'
        className='inline-block w-full'
      />
    );
  }

  return (
    <div className='absolute top-0 left-0 w-full bg-[#272727] text-[#fefaf4] h-[540px]'>
      <div className='grid grid-cols-2 px-8 py-4 gap-8'>
        <div className=''>
          <h3 className='font-bold text-2xl mb-4'>{props.movieData.title}</h3>
          <hr className='mb-4' />
          <p className='text-lg font-bold'>
            Release Date: {props.movieData['release_date']}
          </p>
          <p className='text-lg font-bold'>
            Vote: {props.movieData['vote_average']} / 10
          </p>
          <p className='mt-3 text-justify'>{props.movieData.overview}</p>
        </div>
        <div className=''>{videoContent}</div>
      </div>
    </div>
  );
}
