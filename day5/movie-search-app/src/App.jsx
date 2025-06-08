import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedMovie } from './redux/slices/moviesSlice'
import SearchBar from './components/SearchBar'
import MovieList from './components/MovieList'
import MovieDetails from './components/MovieDetails'
import Favorites from './components/Favorites'

function App() {
  const [showFavorites, setShowFavorites] = useState(false);
  const selectedMovie = useSelector(selectSelectedMovie);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Movie Search App</h1>
        <button 
          className="toggle-favorites-btn"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? 'Show Search' : 'Show Favorites'}
        </button>
      </header>
      
      <main className="app-main">
        {!showFavorites ? (
          <>
            <SearchBar />
            <MovieList />
          </>
        ) : (
          <Favorites />
        )}
      </main>
      
      {selectedMovie && <MovieDetails />}
    </div>
  )
}

export default App
