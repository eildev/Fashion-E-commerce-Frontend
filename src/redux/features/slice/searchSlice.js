
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch search results
export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async ({ query, category }, { rejectWithValue }) => {
    try {
      console.log('Fetching search results:', { query, category });
      // Fetch CSRF cookie
      await axios.get('https://fashion-backend.eclipseposapp.com/sanctum/csrf-cookie', {
        withCredentials: true,
      });

      // Search API call
      const response = await axios.post(
        'https://fashion-backend.eclipseposapp.com/api/product/search',
        {
          query: query.trim(),
          category: category !== 'All Categories' ? category : undefined,
        },
        { withCredentials: true }
      );

      console.log('API response:', response.data);

      // Normalize response
      const normalizedData = {
        products: response.data.products || [],
        categories: response.data.categories || [],
        brands: response.data.brands || [],
      };

      return normalizedData;
    } catch (error) {
      console.error('Search API error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch search results'
      );
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    suggestionsVisible: false,
    results: {
      products: [],
      categories: [],
      brands: [],
    },
    loading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setSuggestionsVisible: (state, action) => {
      state.suggestionsVisible = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = { products: [], categories: [], brands: [] };
      state.suggestionsVisible = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Search request pending');
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
        state.error = null;
        console.log('Search request fulfilled:', action.payload);
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.results = { products: [], categories: [], brands: [] };
        console.log('Search request rejected:', action.payload);
      });
  },
});

export const { setQuery, setSuggestionsVisible, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
