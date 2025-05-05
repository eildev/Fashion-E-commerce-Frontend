import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  setQuery,
  setSuggestionsVisible,
  fetchSearchResults,
  clearSearch,
} from '../../redux/features/slice/searchSlice';
import { setFilteredSearchQuery } from '../../redux/features/slice/filterSlice';
import RenderSuggestion from './RenderSuggestion';
import { result } from 'lodash';

// Debounce utility
const debounce = (func, delay) => {
  let timeoutId;
  const debounced = (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
  debounced.cancel = () => clearTimeout(timeoutId);
  return debounced;
};

const SearchBar = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query, suggestionsVisible, results, loading, error } = useSelector(
    (state) => state.search
  );
  const searchRef = useRef(null);
console.log("result search", result);
  // Get selected category
  const getSelectedCategory = () => {
    const selectElement = document.querySelector('.js-example-basic-single');
    return selectElement ? selectElement.value : 'All Categories';
  };

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value, category) => {
      console.log('Debounced search:', { value, category });
      if (value.trim()) {
        dispatch(fetchSearchResults({ query: value, category }));
      } else {
        dispatch(clearSearch());
      }
    }, 300),
    [dispatch]
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch(setQuery(value));
    if (value.trim()) {
      dispatch(setSuggestionsVisible(true));
      debouncedSearch(value, getSelectedCategory());
    } else {
      dispatch(setSuggestionsVisible(false));
      dispatch(clearSearch());
    }
  };

  // Handle focus
  const handleInputFocus = () => {
    if (query.trim() && results.products.length > 0) {
      dispatch(setSuggestionsVisible(true));
    }
  };

  // Handle search
  const handleSearch = () => {
    if (query.trim()) {
      dispatch(setSuggestionsVisible(false));
      dispatch(setFilteredSearchQuery(query)); // Add search query to filters
      navigate('/shop', {
        state: {
          searchQuery: query,
          category: getSelectedCategory() !== 'All Categories' ? getSelectedCategory() : undefined,
        },
      });
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !event.target.closest('.select2-container')
      ) {
        console.log('Clicked outside, hiding suggestions');
        dispatch(setSuggestionsVisible(false));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  // Clean up debounce
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return (
    <div ref={searchRef} className={`position-relative ${className}`}>
      <div
        className="input-group"
        style={{
          backgroundColor: '#fff',
          borderRadius: '50px',
          // boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          height: '48px',
        }}
      >
        <input
          type="text"
          style={{
            border: 'none',
            padding: '0 16px',
            height: '48px',
            fontSize: '14px',
            flex: 1,
          }}
          placeholder="Search for products, brands..."
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={handleInputFocus}
        />
        <button
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
          }}
          type="button"
          onClick={handleSearch}
        >
          <Icon icon="ic:outline-search" width="24" />
        </button>
      </div>
      {suggestionsVisible && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: '0 0 8px 8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            marginTop: '4px',
            padding: '16px',
            maxHeight: '500px',
            overflowY: 'auto',
            zIndex: 9999,
            top: '100%',
            left: 0,
            maxWidth: '100%',
          }}
        >
          <RenderSuggestion
            isLoading={loading}
            error={error}
            results={results}
            query={query}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;