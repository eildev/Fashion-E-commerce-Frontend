
import { useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setQuery,
  setSuggestionsVisible,
  fetchSearchResults,
} from '../../redux/features/slice/searchSlice';
import { Icon } from '@iconify/react';
import debounce from '../../utils/debounce';
import { useNavigate } from 'react-router-dom';
import RenderSuggestion from './RenderSuggestion';

const SearchBar = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query, isSuggestionsVisible, results, loading, error } = useSelector(
    (state) => state.search
  );
  const searchRef = useRef(null);
  const selectedCategory = useSelector((state) =>
    document.querySelector('.js-example-basic-single')?.value || 'All Categories'
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((value, category) => {
        if (value.trim()) {
          dispatch(fetchSearchResults({ query: value, category }));
        }
      }, 300),
    [dispatch]
  );

  // Handle query changes and suggestion visibility
  useEffect(() => {
    if (query.trim()) {
      dispatch(setSuggestionsVisible(true));
      debouncedSearch(query, selectedCategory);
    } else {
      dispatch(setSuggestionsVisible(false));
      dispatch({ type: 'search/clearResults' }); // Clear results when query is empty
    }
    return () => debouncedSearch.cancel();
  }, [query, selectedCategory, debouncedSearch, dispatch]);

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        dispatch(setSuggestionsVisible(false));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      dispatch(setSuggestionsVisible(false));
      navigate('/shop', { state: { searchQuery: query } });
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (query.trim()) {
      dispatch(setSuggestionsVisible(false));
      navigate('/shop', { state: { searchQuery: query } });
    }
  };

  // Handle input focus to show suggestions
  const handleInputFocus = () => {
    if (query.trim()) {
      dispatch(setSuggestionsVisible(true));
    }
  };

  return (
    <div ref={searchRef} className={`position-relative ${className}`}>
      <div className="input-group rounded-pill shadow-sm overflow-hidden bg-white">
        <input
          type="text"
          className="form-control border-0 ps-3"
          placeholder="Search for products, brands..."
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          onKeyPress={handleKeyPress}
          onFocus={handleInputFocus}
          style={{ height: '48px' }}
        />
        <button
          className="btn btn-light border-0"
          type="button"
          onClick={handleSearchClick}
        >
          <Icon icon="ic:outline-search" width="24" />
        </button>
      </div>
      {isSuggestionsVisible && (
        <div
          className="position-absolute w-100 bg-white rounded-bottom shadow-lg mt-1 p-3 z-3"
          style={{ maxHeight: '500px', overflowY: 'auto' }}
        >
          <RenderSuggestion
            isLoading={loading}
            error={error}
            productData={results}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
