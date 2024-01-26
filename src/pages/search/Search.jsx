import NavBar from '../../components/NavBar';
import ResultList from './components/ResultList';
import SearchForm from './components/SearchForm';
import { requests } from '../../api-endpoint';
import { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');

  function handleSearchClick(searchQuery) {
    setQuery(searchQuery);
  }

  return (
    <div className='bg-[#111]'>
      <NavBar />
      <SearchForm onSearchClick={handleSearchClick} />
      <ResultList query={query} apiEndpoint={requests.fetchSearch} />
    </div>
  );
};

export default Search;
