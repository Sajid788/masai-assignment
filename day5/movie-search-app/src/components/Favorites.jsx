import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites } from '../redux/slices/favoritesSlice';
import { fetchMovieDetails } from '../redux/slices/moviesSlice';
import MovieCard from './MovieCard';

const Favorites = () => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  const handleMovieClick = (imdbID) => {
    dispatch(fetchMovieDetails(imdbID));
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>Favorites</h2>
        <p>You haven't added any favorites yet.</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      <div className="favorites-list">
        {favorites.map((movie) => (
          <MovieCard 
            key={movie.imdbID} 
            movie={movie} 
            onClick={() => handleMovieClick(movie.imdbID)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites; 