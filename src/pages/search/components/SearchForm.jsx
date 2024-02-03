import { useRef } from 'react';
import search from '/search.svg';

export default function SearchForm(props) {
  const inputSearch = useRef();

  function handleSearch(event) {
    event.preventDefault();
    const searchQuery = inputSearch.current.value.trim();

    // pass data to parent component via props
    props.onSearchClick(searchQuery);

    inputSearch.current.value = '';
  }

  function handleReset(event) {
    event.preventDefault();
    props.onSearchClick('');

    inputSearch.current.value = '';
  }

  return (
    <div className='flex items-center justify-center '>
      <form className='bg-white w-[800px]' onSubmit={handleSearch}>
        <div className='flex items-center justify-between px-8 py-4 gap-2'>
          <input
            type='text'
            className='outline-none w-full text-xl'
            ref={inputSearch}
          />
          <img src={search} alt='Search Icon' className='size-6' />
        </div>
        <hr className='bg-[#3fc7eb] h-1' />
        <div className='text-right px-10 py-10'>
          <button
            className='uppercase font-bold mr-6 text-[#767676]'
            onClick={handleReset}
            type='button'
          >
            Reset
          </button>
          <button
            className='uppercase text-white bg-[#3fc7eb] px-4 py-2 font-bold hover:bg-[#36accc]'
            type='submit'
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
