import { useEffect, useState } from 'react';
import search from '/search.svg';

export default function NavBar() {
  const [background, setBackground] = useState(false);

  useEffect(() => {
    function handleNavBarBackground() {
      if (window.scrollY > 100) {
        setBackground(true);
      } else {
        setBackground(false);
      }
    }

    window.addEventListener('scroll', handleNavBarBackground);

    return () => {
      window.removeEventListener('scroll', handleNavBarBackground);
    };
  }, []);

  return (
    <nav
      className={`flex content-center justify-between p-5 sticky top-0 left-0 ${
        background && 'bg-black'
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
