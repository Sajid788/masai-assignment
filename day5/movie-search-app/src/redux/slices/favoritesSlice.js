import { createSlice } from '@reduxjs/toolkit';

// Load favorites from localStorage if available
const loadFavorites = () => {
  try {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch (error) {
    console.error('Failed to load favorites from localStorage:', error);
    return [];
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: loadFavorites(),
  },
  reducers: {
    addFavorite: (state, action) => {
      const movieExists = state.favorites.some(movie => movie.imdbID === action.payload.imdbID);
      if (!movieExists) {
        state.favorites.push(action.payload);
        // Save to localStorage
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(movie => movie.imdbID !== action.payload);
      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// Selectors
export const selectFavorites = (state) => state.favorites.favorites;
export const selectIsFavorite = (state, imdbID) => 
  state.favorites.favorites.some(movie => movie.imdbID === imdbID);

export default favoritesSlice.reducer; 