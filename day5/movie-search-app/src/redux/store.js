import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
  },
}); 