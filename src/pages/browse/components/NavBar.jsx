import search from '/search.svg';

export default function NavBar() {
  return (
    <nav className='flex content-center justify-between p-5 bg-gray-400'>
      <a href='/'>
        <h1 className='text-[#e50607] font-bold text-2xl'>Movie App</h1>
      </a>
      <a href='/search'>
        <img src={search} alt='Search Icon' className='size-8' />
      </a>
    </nav>
  );
}
