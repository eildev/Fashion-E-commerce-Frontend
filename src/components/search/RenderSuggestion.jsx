
import { Icon } from '@iconify/react/dist/iconify.js';
import SuggestionItem from './SuggestionItem';
import { useDispatch } from 'react-redux';
import { setSuggestionsVisible } from '../../redux/features/slice/searchSlice';
import { Link } from 'react-router-dom';
import SearchItemSkeleton from './SearchItemSkeleton';

const RenderSuggestion = ({ isLoading, error, productData }) => {
  const dispatch = useDispatch();
  const handleHideSuggestions = () => {
    dispatch(setSuggestionsVisible(false));
  };

  const handleSuggestionClick = (e) => {
    e.stopPropagation();
  };

  if (isLoading) {
    return [...Array(5)].map((_, index) => <SearchItemSkeleton key={index} />);
  }
  if (error) {
    return (
      <p className="p-3 text-danger">Error loading suggestions</p>
    );
  }

  if (
    !productData?.products?.length &&
    !productData?.categories?.length &&
    !productData?.brands?.length
  ) {
    return (
      <p className="p-3 text-center text-dark">No results found</p>
    );
  }

  return (
    <div onClick={handleSuggestionClick}>
      {productData.products?.length > 0 && (
        <div>
          <h3 className="fw-bold fs-5 px-3 py-2 text-dark">Products</h3>
          <hr className="my-1" />
          <div>
            {productData.products.slice(0, 10).map((item, index) => (
              <SuggestionItem
                key={index}
                item={item}
                showDivider={
                  index !== productData.products.slice(0, 10).length - 1
                }
              />
            ))}
          </div>
        </div>
      )}
      {productData.categories?.length > 0 && (
        <div>
          <h3 className="fw-bold fs-5 px-3 py-2 text-dark">Categories</h3>
          <ul className="list-unstyled">
            {productData.categories.slice(0, 10).map((item, index) => (
              <li
                key={index}
                className="px-3 py-1 d-flex align-items-center hover-bg-light"
              >
                <Icon icon="iwwa:tag" width="16" height="16" className="me-2" />
                <Link
                  to="/shop"
                  state={{ categoryId: item?.id }}
                  onClick={handleHideSuggestions}
                  className="w-100 text-dark text-decoration-none"
                >
                  {item?.categoryName ?? 'NA'}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {productData.brands?.length > 0 && (
        <div>
          <h3 className="fw-bold fs-5 px-3 py-2 text-dark">Brands</h3>
          <ul className="list-unstyled">
            {productData.brands.slice(0, 10).map((item, index) => (
              <li
                key={index}
                className="px-3 py-1 d-flex align-items-center hover-bg-light"
              >
                <Icon icon="iwwa:tag" width="16" height="16" className="me-2" />
                <Link
                  to="/shop"
                  state={{ brandId: item.id }}
                  onClick={handleHideSuggestions}
                  className="w-100 text-dark text-decoration-none"
                >
                  {item?.BrandName ?? 'NA'}
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
