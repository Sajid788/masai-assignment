import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite, selectIsFavorite } from '../redux/slices/favoritesSlice';

const MovieCard = ({ movie, onClick }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => selectIsFavorite(state, movie.imdbID));
  
  const { Title, Year, Poster, imdbID } = movie;
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    
    if (isFavorite) {
      dispatch(removeFavorite(imdbID));
    } else {
      dispatch(addFavorite(movie));
    }
  };
  
  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-poster">
        {Poster && Poster !== 'N/A' ? (
          <img src={Poster} alt={`${Title} poster`} />
        ) : (
          <div className="no-poster">No Image Available</div>
        )}
      </div>
      <div className="movie-info">
        <h3>{Title}</h3>
        <p>{Year}</p>
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard; 