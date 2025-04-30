import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSuggestionsVisible } from '../../redux/features/slice/searchSlice';
import { imagePath } from '../imagePath';
import toast from 'react-hot-toast';

const SuggestionItem = memo(function SuggestionItem({ item, showDivider }) {
  const { product_name, thumbnail, variants, slug, variant_image } = item;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product_image =
    thumbnail || (variant_image?.[0]?.image ? imagePath(variant_image[0].image) : '');

  const handleItemClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (slug) {
      dispatch(setSuggestionsVisible(false));
      navigate(`/product/${slug}`);
    } else {
      toast.error('Product details unavailable. Please try again.');
    }
  };

  return (
    <div>
      <div
        className="px-3 py-2 hover-bg-light rounded cursor-pointer d-flex align-items-center gap-3"
        onClick={handleItemClick}
      >
        <img
          src={product_image || 'https://via.placeholder.com/40'}
          alt={product_name || 'Product'}
          className="w-10 h-10 object-cover rounded"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/40')}
        />
        <div>
          <p className="fw-medium fs-6 text-dark mb-0">
            {product_name || 'Unknown Product'}
          </p>
          <p className="fs-6 text-muted">
            ৳ {variants?.[0]?.regular_price || 'N/A'}
          </p>
        </div>
      </div>
      {showDivider && <hr className="my-2" />}
    </div>
  );
});

export default SuggestionItem;