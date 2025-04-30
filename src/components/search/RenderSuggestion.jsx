import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCategoryWithName, addBrand } from '../../redux/features/slice/filterSlice';
import { setSuggestionsVisible } from '../../redux/features/slice/searchSlice';

const RenderSuggestion = ({ isLoading, error, results, query }) => {
  const dispatch = useDispatch();

  // Highlight matching query
  const highlightMatch = (text, query) => {
    if (!query || !text) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong style="color: #007bff; font-weight: 600;">$1</strong>');
  };

  // Filter results to show only matching items
  const filteredResults = {
    products: results.products.filter((product) =>
      product.product_name.toLowerCase().includes(query.toLowerCase())
    ),
    categories: results.categories.filter((category) =>
      category.categoryName.toLowerCase().includes(query.toLowerCase())
    ),
    brands: results.brands.filter((brand) =>
      brand.BrandName.toLowerCase().includes(query.toLowerCase())
    ),
  };

  console.log('Filtered results:', filteredResults);

  // Handle category click
  const handleCategoryClick = (category) => {
    dispatch(addCategoryWithName({ id: category.id, name: category.categoryName }));
    dispatch(setSuggestionsVisible(false));
  };

  // Handle brand click
  const handleBrandClick = (brand) => {
    dispatch(addBrand({ id: brand.id, name: brand.BrandName }));
    dispatch(setSuggestionsVisible(false));
  };

  // Loading state
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', color: '#6c757d', padding: '8px 0' }}>
        Loading...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ textAlign: 'center', color: '#dc3545', padding: '8px 0' }}>
        Error: {error}
      </div>
    );
  }

  // No results
  const hasResults =
    filteredResults.products.length > 0 ||
    filteredResults.categories.length > 0 ||
    filteredResults.brands.length > 0;
  if (!hasResults && query.trim()) {
    return (
      <div style={{ textAlign: 'center', color: '#6c757d', padding: '8px 0' }}>
        No results found for "{query}"
      </div>
    );
  }

  return (
    <div style={{ fontSize: '14px' }}>
      {/* Products */}
      {filteredResults.products.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h6
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '8px',
            }}
          >
            Products
          </h6>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {filteredResults.products.slice(0, 5).map((product) => (
              <li key={product.id} style={{ padding: '4px 0' }}>
                <Link
                  to={`/product-details-two/${product.id}`}
                  style={{
                    color: '#333',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onClick={() => dispatch(setSuggestionsVisible(false))}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#007bff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#333')}
                >
                  {product.thumbnail && (
                    <img
                      src={product.thumbnail}
                      alt={product.product_name}
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                  )}
                  <div>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(product.product_name, query),
                      }}
                    />
                    <div style={{ color: '#6c757d', fontSize: '12px' }}>
                      ${product.variants[0]?.regular_price || 'N/A'}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Categories */}
      {filteredResults.categories.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h6
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '8px',
            }}
          >
            Categories
          </h6>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {filteredResults.categories.slice(0, 3).map((category) => (
              <li key={category.id} style={{ padding: '4px 0' }}>
                <Link
                  to="/shop"
                  onClick={() => handleCategoryClick(category)}
                  style={{ color: '#333', textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#007bff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#333')}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightMatch(category.categoryName, query),
                      }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Brands */}
      {filteredResults.brands.length > 0 && (
        <div>
          <h6
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '8px',
            }}
          >
            Brands
          </h6>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {filteredResults.brands.slice(0, 3).map((brand) => (
              <li key={brand.id} style={{ padding: '4px 0' }}>
                <Link
                  to="/shop"
                  onClick={() => handleBrandClick(brand)}
                  style={{ color: '#333', textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#007bff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#333')}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightMatch(brand.BrandName, query),
                    }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RenderSuggestion;