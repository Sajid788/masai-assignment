import { useSelector, useDispatch } from 'react-redux';
import { 
  selectSearchResults, 
  selectMoviesStatus, 
  selectMoviesError,
  fetchMovieDetails
} from '../redux/slices/moviesSlice';
import MovieCard from './MovieCard';

const MovieList = () => {
  const movies = useSelector(selectSearchResults);
  const status = useSelector(selectMoviesStatus);
  const error = useSelector(selectMoviesError);
  const dispatch = useDispatch();

  const handleMovieClick = (imdbID) => {
    dispatch(fetchMovieDetails(imdbID));
  };

  if (status === 'loading') {
    return <div className="loading">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="error">Error: {error}</div>;
  }

  if (movies && movies.length === 0 && status === 'succeeded') {
    return <div className="no-results">No movies found. Try a different search term.</div>;
  }

  return (
    <div className="movie-list">
      {movies && movies.map((movie) => (
        <MovieCard 
          key={movie.imdbID} 
          movie={movie} 
          onClick={() => handleMovieClick(movie.imdbID)} 
        />
      ))}
    </div>
  );
};

export default MovieList; 