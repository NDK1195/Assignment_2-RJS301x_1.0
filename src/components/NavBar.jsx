import { useEffect, useState } from 'react';
import search from '/search.svg';

export default function NavBar() {
  const [navBackground, setNavBackground] = useState(false);

  useEffect(() => {
    // handle change navbar background when scroll over 100px
    function handleChangeNavBackground() {
      if (window.scrollY > 100) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    }

    window.addEventListener('scroll', handleChangeNavBackground);

    return () => {
      window.removeEventListener('scroll', handleChangeNavBackground);
    };
  }, []);

  return (
    <nav
      className={`flex content-center justify-between p-5 sticky top-0 left-0 z-10 transition-all ${
        navBackground && 'bg-black'
      }`}
    >
      <a href='/'>
        <h1 className='text-[#e50607] font-bold text-2xl'>Movie App</h1>
      </a>
      <a href='/search'>
        <img src={search} alt='Search Icon' className='size-8' />
      </a>
    </nav>
  );
}
