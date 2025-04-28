import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import QuantityControl from '../helper/QuantityControl';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { clearCart, removeFromCart } from '../redux/features/slice/cartSlice';
import { clearSelections, toggleAllSelection } from '../redux/features/slice/selectCartSlice';
import { useCheckCouponMutation } from '../redux/features/api/couponApi';

const CartSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { selectedItems, allSelected } = useSelector((state) => state.selectCart);
  const [coupon_code, setCoupon_code] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isRemoveAll, setIsRemoveAll] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [couponData, setCouponData] = useState({});
  const [checkCoupon, { isLoading, isError, error }] = useCheckCouponMutation();
  const [searchParams, setSearchParams] = useSearchParams();

  const filteredCartItems = cartItems.filter((item) =>
    user?.id ? item.user_id === user.id : item.user_id == null
  );

  // Load coupon from URL on mount
  useEffect(() => {
    const urlCoupon = searchParams.get('coupon');
    if (urlCoupon) {
      setCoupon_code(urlCoupon);
      const fetchCoupon = async () => {
        try {
          const response = await checkCoupon({ coupon_code: urlCoupon }).unwrap();
          const discountValue = Math.round(response?.data?.discount_value);
          setDiscountPrice(discountValue);
          setCouponData(response.data);
        } catch (err) {
          console.error('Error fetching coupon:', err);
          toast.error('Invalid or expired coupon');
        }
      };
      fetchCoupon();
    }
  }, [searchParams, checkCoupon]);

  // Calculate subtotal
  const subTotalPrice = filteredCartItems.reduce((sum, item) => {
    const regularPrice = item?.regular_price || 0;
    const quantity = item?.quantity || 1;
    const discountValue = item?.product_variant_promotion?.coupon?.discount_value || 0;
    const discountType = item?.product_variant_promotion?.coupon?.discount_type;

    let finalPrice = regularPrice;
    if (discountType === 'fixed') {
      finalPrice = regularPrice - discountValue;
    } else if (discountType === 'percentage') {
      finalPrice = regularPrice - (regularPrice * discountValue) / 100;
    }
    finalPrice = Math.max(finalPrice, 0);

    return sum + finalPrice * quantity;
  }, 0);

  // Calculate shipping
  const shippingQuantity = filteredCartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shippingPrice = filteredCartItems.length > 0 ? 80 + (shippingQuantity - 1) * 20 : 0;

  // Calculate tax (2% of subtotal)
  const tax = parseFloat(subTotalPrice * 0.02).toFixed(2);

  // Calculate discount from coupon
  const discountAmount = couponData?.status === 'Active' && discountPrice
    ? couponData.discount_type === 'fixed'
      ? discountPrice
      : (discountPrice * subTotalPrice) / 100
    : 0;

  // Calculate total
  const totalPrice = (subTotalPrice - discountAmount + parseFloat(tax) + shippingPrice).toFixed(2);

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsRemoveAll(false);
    setShowModal(true);
  };

  const handleRemoveAll = () => {
    setIsRemoveAll(true);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (isRemoveAll) {
      if (selectedItems.length === 0) {
        dispatch(clearCart());
        toast.success('All items removed from cart');
      } else {
        selectedItems.forEach((id) => dispatch(removeFromCart(id)));
        dispatch(clearSelections());
        toast.success('Selected items removed from cart');
      }
    } else if (itemToDelete) {
      dispatch(removeFromCart(itemToDelete));
      toast.success('Item removed successfully');
    }
    setShowModal(false);
    setItemToDelete(null);
    setIsRemoveAll(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setItemToDelete(null);
    setIsRemoveAll(false);
  };

  const handleToggleAll = () => {
    const allItemIds = filteredCartItems.map((item) => item.id);
    dispatch(toggleAllSelection(allItemIds));
  };

  const handleApply = async () => {
    if (coupon_code.trim() === '') {
      toast.error('Please enter a valid coupon code');
      return;
    }
    try {
      const response = await checkCoupon({ coupon_code }).unwrap();
      const discountValue = Math.round(response?.data?.discount_value);
      setDiscountPrice(discountValue);
      setCouponData(response.data);
      if (response.data?.status === 'Active') {
        toast.success(
          `You got ${discountValue}${response.data.discount_type === 'percentage' ? '%' : '$'} discount`
        );
        setSearchParams({ coupon: coupon_code });
        setCoupon_code('');
      } else {
        toast.error('Invalid coupon code');
        setCouponData({});
        setDiscountPrice(0);
        setSearchParams({});
      }
    } catch (err) {
      toast.error('Invalid coupon code!');
      setCouponData({});
      setDiscountPrice(0);
      setSearchParams({});
    }
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout', {
      state: {
        coupon: couponData?.status === 'Active' ? {
          code: searchParams.get('coupon'),
          discount_value: discountPrice,
          discount_type: couponData.discount_type,
        } : null,
        cartTotals: {
          subTotal: subTotalPrice,
          discount: discountAmount,
          tax,
          shipping: shippingPrice,
          total: totalPrice,
        },
      },
    });
  };

  return (
    <section className="cart py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xl-9 col-lg-8">
            <div className="cart-table border border-gray-100 rounded-8 px-40 py-48">
              <div className="overflow-x-auto scroll-sm scroll-sm-horizontal">
                <table className="table style-three">
                  <thead>
                    <tr>
                      <th className="h6 mb-0 text-lg fw-bold">Delete</th>
                      <th className="h6 mb-0 text-lg fw-bold">Product Name</th>
                      <th className="h6 mb-0 text-lg fw-bold">Price</th>
                      <th className="h6 mb-0 text-lg fw-bold">Quantity</th>
                      <th className="h6 mb-0 text-lg fw-bold">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCartItems?.map((item, i) => (
                      <tr key={i}>
                        <td>
                          <button
                            onClick={() => handleDelete(item?.id)}
                            type="button"
                            className="remove-tr-btn flex-align gap-12 hover-text-danger-600"
                          >
                            <i className="ph ph-x-circle text-2xl d-flex" />
                            Remove
                          </button>
                        </td>
                        <td>
                          <div className="table-product d-flex align-items-center gap-24">
                            <Link
                              to={`/product-details-two/${item.id}`}
                              className="table-product__thumb border border-gray-100 rounded-8 flex-center"
                            >
                              <img
                                src={`http://127.0.0.1:8000/${item.variant_image[0].image}`}
                                alt={item.product.product_name}
                              />
                            </Link>
                            <div className="table-product__content text-start">
                              <h6 className="title text-lg fw-semibold mb-8">
                                <Link
                                  to={`/product-details-two/${item.id}`}
                                  className="link text-line-2"
                                >
                                  {item.product.product_name}
                                </Link>
                              </h6>
                              <div className="flex-align gap-16 mb-16">
                                <div className="flex-align gap-6">
                                  <span className="text-md fw-medium text-warning-600 d-flex">
                                    <i className="ph-fill ph-star" />
                                  </span>
                                  <span className="text-md fw-semibold text-gray-900">4.8</span>
                                </div>
                                <span className="text-sm fw-medium text-gray-200">|</span>
                                <span className="text-neutral-600 text-sm">128 Reviews</span>
                              </div>
                              <div className="flex-align gap-16">
                                <Link
                                  to="/cart"
                                  className="product-card__cart btn bg-gray-50 text-heading text-sm hover-bg-main-600 hover-text-white py-7 px-8 rounded-8 flex-center gap-8 fw-medium"
                                >
                                  Camera
                                </Link>
                                <Link
                                  to="/cart"
                                  className="product-card__cart btn bg-gray-50 text-heading text-sm hover-bg-main-600 hover-text-white py-7 px-8 rounded-8 flex-center gap-8 fw-medium"
                                >
                                  Videos
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-lg h6 mb-0 fw-semibold">${item?.regular_price}</span>
                        </td>
                        <td>
                          <QuantityControl initialQuantity={item.quantity} item={item} />
                        </td>
                        <td>
                          <span className="text-lg h6 mb-0 fw-semibold">
                            ${(item?.regular_price * item.quantity).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex-between flex-wrap gap-16 mt-16">
                <div className="flex-align gap-16">
                  <input
                    type="text"
                    className="common-input border-gray-100"
                    placeholder="Coupon Code"
                    value={coupon_code}
                    onChange={(e) => setCoupon_code(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="btn btn-main py-18 w-100 rounded-8"
                    onClick={handleApply}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Applying...' : 'Apply Coupon'}
                  </button>
                </div>
                <button
                  type="button"
                  className="text-lg text-gray-500 hover-text-main-600"
                  onClick={handleRemoveAll}
                >
                  Remove Selected
                </button>
              </div>
              {couponData?.status === 'Active' && (
                <div className="mt-16 text-success-600">
                  Coupon applied: {searchParams.get('coupon')} (
                  {couponData.discount_type === 'percentage'
                    ? `${discountPrice}%`
                    : `$${discountPrice}`}
                  )
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-3 col-lg-4">
            <div className="cart-sidebar border border-gray-100 rounded-8 px-24 py-40">
              <h6 className="text-xl mb-32">Cart Totals</h6>
              <div className="bg-color-three rounded-8 p-24">
                <div className="mb-32 flex-between gap-8">
                  <span className="text-gray-900 font-heading-two">Subtotal</span>
                  <span className="text-gray-900 fw-semibold">${subTotalPrice.toFixed(2)}</span>
                </div>
                {
                    couponData?.status === 'Active' && (
                      <div className="mb-32 flex-between gap-8">
                        <span className="text-gray-900 font-heading-two">Discount</span>
                        <span className="text-gray-900 fw-semibold">
                          -${discountAmount.toFixed(2)}
                        </span>
                      </div>
                    )
                }
                <div className="mb-32 flex-between gap-8">
                  <span className="text-gray-900 font-heading-two">Estimated Delivery</span>
                  <span className="text-gray-900 fw-semibold">${shippingPrice.toFixed(2)}</span>
                </div>
                <div className="mb-0 flex-between gap-8">
                  <span className="text-gray-900 font-heading-two">Estimated Taxes</span>
                  <span className="text-gray-900 fw-semibold">${tax}</span>
                </div>
              </div>
              <div className="bg-color-three rounded-8 p-24 mt-24">
                <div className="flex-between gap-8">
                  <span className="text-gray-900 text-xl fw-semibold">Total</span>
                  <span className="text-gray-900 text-xl fw-semibold">${totalPrice}</span>
                </div>
              </div>
              <button
                onClick={handleProceedToCheckout}
                className="btn btn-main mt-40 py-18 w-100 rounded-8"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1050,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'fadeIn 0.3s ease-in-out',
          }}
          onClick={cancelDelete}
        >
          <div
            style={{
              maxWidth: '400px',
              width: '100%',
              background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              padding: '24px',
              position: 'relative',
              animation: 'slideIn 0.3s ease-in-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#1C1B1B',
                  margin: '0 auto',
                  textAlign: 'center',
                }}
              >
                {isRemoveAll ? 'Remove All Items' : 'Remove Item'}
              </h1>
              <button
                onClick={cancelDelete}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  color: '#1C1B1B',
                  cursor: 'pointer',
                  padding: '0',
                  lineHeight: '1',
                }}
              >
                ×
              </button>
            </div>
            <div
              style={{
                textAlign: 'center',
                marginBottom: '24px',
              }}
            >
              <p
                style={{
                  fontSize: '18px',
                  color: '#4B5563',
                  margin: '0',
                  lineHeight: '1.5',
                }}
              >
                {isRemoveAll
                  ? 'Are you sure you want to remove all selected items from your cart?'
                  : 'Are you sure you want to remove this item from your cart?'}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
              }}
            >
              <button
                onClick={cancelDelete}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#1C1B1B',
                  background: '#E5E7EB',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.background = '#D1D5DB')}
                onMouseOut={(e) => (e.target.style.background = '#E5E7EB')}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#FFFFFF',
                  background: 'linear-gradient(90deg, #FA6400, #FA6400)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) =>
                  (e.target.style.background = 'linear-gradient(90deg, #FA6400, #FA6400)')
                }
                onMouseOut={(e) =>
                  (e.target.style.background = 'linear-gradient(90deg, #FA6400, #FA6400)')
                }
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartSection;