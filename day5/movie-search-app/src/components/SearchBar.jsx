import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm, searchMovies } from '../redux/slices/moviesSlice';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  // Debounce search input
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (input.trim()) {
        dispatch(setSearchTerm(input));
        dispatch(searchMovies(input));
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(debounceTimer);
  }, [input, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(setSearchTerm(input));
      dispatch(searchMovies(input));
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar; 