import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Using OMDB API
const API_KEY = '3e2f8be3'; // This is a sample key, you should get your own from omdbapi.com
const API_URL = 'https://www.omdbapi.com/';

// Async thunk for fetching movies
export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${searchTerm}`);
      
      if (response.data.Response === 'False') {
        return rejectWithValue(response.data.Error);
      }
      
      return response.data.Search;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching movie details
export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (imdbID, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
      
      if (response.data.Response === 'False') {
        return rejectWithValue(response.data.Error);
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    searchTerm: '',
    searchResults: [],
    selectedMovie: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    page: 1,
    totalResults: 0,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.searchResults = [];
      })
      // Fetch movie details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, clearSelectedMovie, setPage } = moviesSlice.actions;

// Selectors
export const selectSearchTerm = (state) => state.movies.searchTerm;
export const selectSearchResults = (state) => state.movies.searchResults;
export const selectSelectedMovie = (state) => state.movies.selectedMovie;
export const selectMoviesStatus = (state) => state.movies.status;
export const selectMoviesError = (state) => state.movies.error;
export const selectPage = (state) => state.movies.page;

export default moviesSlice.reducer; 