import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedMovie, selectMoviesStatus, clearSelectedMovie } from '../redux/slices/moviesSlice';
import { addFavorite, removeFavorite, selectIsFavorite } from '../redux/slices/favoritesSlice';

const MovieDetails = () => {
  const movie = useSelector(selectSelectedMovie);
  const status = useSelector(selectMoviesStatus);
  const dispatch = useDispatch();
  
  if (!movie) return null;
  
  const isFavorite = useSelector((state) => selectIsFavorite(state, movie.imdbID));
  
  const handleClose = () => {
    dispatch(clearSelectedMovie());
  };
  
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.imdbID));
    } else {
      dispatch(addFavorite({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster
      }));
    }
  };
  
  if (status === 'loading') {
    return (
      <div className="movie-details-modal">
        <div className="modal-content">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="movie-details-modal">
      <div className="modal-content">
        <button className="close-btn" onClick={handleClose}>×</button>
        
        <div className="movie-details-content">
          <div className="movie-poster">
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
            ) : (
              <div className="no-poster">No Image Available</div>
            )}
          </div>
          
          <div className="movie-info">
            <h2>{movie.Title} <span>({movie.Year})</span></h2>
            
            <div className="movie-meta">
              <span>{movie.Rated}</span>
              <span>{movie.Runtime}</span>
              <span>{movie.Genre}</span>
              <span>{movie.Released}</span>
            </div>
            
            <div className="movie-rating">
              <strong>IMDB: {movie.imdbRating}/10</strong>
            </div>
            
            <div className="movie-plot">
              <h3>Plot</h3>
              <p>{movie.Plot}</p>
            </div>
            
            <div className="movie-credits">
              <p><strong>Director:</strong> {movie.Director}</p>
              <p><strong>Writer:</strong> {movie.Writer}</p>
              <p><strong>Actors:</strong> {movie.Actors}</p>
            </div>
            
            <button 
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={handleFavoriteToggle}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 