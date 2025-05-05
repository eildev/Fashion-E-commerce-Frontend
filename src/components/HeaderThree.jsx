
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutUserMutation } from '../redux/features/api/auth/authApi';
import SearchBar from './search/SearchBar';
import { useGetCategoryQuery } from '../redux/features/api/categoryApi';

const HeaderThree = ({ category }) => {
  const [scroll, setScroll] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
   const { data: categoryApi } = useGetCategoryQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
console.log("category check", categoryApi);
const filterdCategoryByParents = categoryApi?.categories?.filter(category => category.parent_id === null) 
// const filterdSubCategoryByParents = categoryApi?.categories?.filter(category => category.parent_id === fil) 
  // State for user dropdown
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleUserDropdownToggle = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch({ type: 'auth/logout' });
      navigate('/account');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setUserDropdownOpen(false);
  };

  // Handle scroll for fixed header
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset < 150) {
        setScroll(false);
      } else if (window.pageYOffset > 150) {
        setScroll(true);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Initialize Select2 for category dropdown
    const selectElement = $('.js-example-basic-single');
    selectElement.select2();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (selectElement.data('select2')) {
        selectElement.select2('destroy');
      }
    };
  }, []);

  // Language and currency state
  const [selectedLanguage, setSelectedLanguage] = useState('Eng');
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  // Mobile menu support
  const [menuActive, setMenuActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const handleMenuClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };

  // Category control support
  const [activeCategory, setActiveCategory] = useState(false);
  const handleCategoryToggle = () => {
    setActiveCategory(!activeCategory);
  };
  const [activeIndexCat, setActiveIndexCat] = useState(null);
  const handleCatClick = (index) => {
    setActiveIndexCat(activeIndexCat === index ? null : index);
  };

  return (
    <>
      {/* Overlay for mobile menu */}
      <div className="overlay" style={{ zIndex: 9997 }} />
      <div
        className={`side-overlay ${menuActive || activeCategory ? 'show' : ''}`}
        style={{ zIndex: 9997 }}
      />
      {/* Mobile Menu */}
      <div
        className={`mobile-menu scroll-sm d-lg-none d-block ${menuActive ? 'active' : ''}`}
        style={{ zIndex: 9998 }}
      >
        <button
          onClick={() => {
            handleMenuToggle();
            setActiveIndex(null);
          }}
          type="button"
          className="close-button"
        >
          <i className="ph ph-x" />
        </button>
        <div className="mobile-menu__inner">
          <Link to="/" className="mobile-menu__logo">
            <img src="assets/images/logo/logo.png" alt="Logo" />
          </Link>
          <div className="mobile-menu__menu">
            <ul className="nav-menu flex-align nav-menu--mobile">
              <li
                onClick={() => handleMenuClick(0)}
                className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 0 ? 'd-block' : ''}`}
              >
                <Link to="#" className="nav-menu__link">
                  Home
                </Link>
                <ul
                  className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${activeIndex === 0 ? 'open' : ''}`}
                >
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Home Grocery
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/index-two"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Home Electronics
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/index-three"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Home Fashion
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                onClick={() => handleMenuClick(1)}
                className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 1 ? 'd-block' : ''}`}
              >
                <Link to="#" className="nav-menu__link">
                  Shop
                </Link>
                <ul
                  className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${activeIndex === 1 ? 'open' : ''}`}
                >
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/shop"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Shop
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/product-details"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Shop Details
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/product-details-two"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Shop Details Two
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                onClick={() => handleMenuClick(2)}
                className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 2 ? 'd-block' : ''}`}
              >
                <span className="badge-notification bg-warning-600 text-white text-sm py-2 px-8 rounded-4">
                  New
                </span>
                <Link to="#" className="nav-menu__link">
                  Pages
                </Link>
                <ul
                  className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${activeIndex === 2 ? 'open' : ''}`}
                >
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/cart"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Cart
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/wishlist"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Wishlist
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/checkout"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Checkout
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/become-seller"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Become Seller
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/account"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Account
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                onClick={() => handleMenuClick(3)}
                className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 3 ? 'd-block' : ''}`}
              >
                <span className="badge-notification bg-tertiary-600 text-white text-sm py-2 px-8 rounded-4">
                  New
                </span>
                <Link to="#" className="nav-menu__link">
                  Vendors
                </Link>
                <ul
                  className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${activeIndex === 3 ? 'open' : ''}`}
                >
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/vendor"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Vendors
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/vendor-details"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Vendor Details
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/vendor-two"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Vendors Two
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/vendor-two-details"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Vendors Two Details
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                onClick={() => handleMenuClick(4)}
                className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 4 ? 'd-block' : ''}`}
              >
                <Link to="#" className="nav-menu__link">
                  Blog
                </Link>
                <ul
                  className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${activeIndex === 4 ? 'open' : ''}`}
                >
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/blog"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Blog
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/blog-details"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Blog Details
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-menu__item">
                <Link to="/contact" className="nav-menu__link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Middle Header Two */}
      <header
        className="header-middle style-two bg-color-neutral"
        style={{ zIndex: 1001, overflow: 'visible' }}
      >
        <div className="container container-lg" style={{ overflow: 'visible' }}>
          <nav className="header-inner flex-between" style={{ overflow: 'visible' }}>
            {/* Logo */}
            <div className="logo">
              <Link to="/" className="link">
                <img src="assets/images/logo/logo-two.png" alt="Logo" />
              </Link>
            </div>
            {/* Search Bar */}
            <div className="flex-align gap-16">
              <div className="select-dropdown-for-home-two d-lg-none d-block">
                <ul className="header-top__right style-two flex-align flex-wrap">
                  <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
                    <Link to="#" className="selected-text text-heading text-sm py-8">
                      {selectedLanguage}
                    </Link>
                    <ul className="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8" style={{ zIndex: 1003 }}>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange('English')}
                        >
                          <img
                            src="assets/images/thumbs/flag1.png"
                            alt="English"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          English
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange('Japan')}
                        >
                          <img
                            src="assets/images/thumbs/flag2.png"
                            alt="Japan"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          Japan
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange('French')}
                        >
                          <img
                            src="assets/images/thumbs/flag3.png"
                            alt="French"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          French
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange('Germany')}
                        >
                          <img
                            src="assets/images/thumbs/flag4.png"
                            alt="Germany"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          Germany
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange('Bangladesh')}
                        >
                          <img
                            src="assets/images/thumbs/flag6.png"
                            alt="Bangladesh"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          Bangladesh
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange('South Korea')}
                        >
                          <img
                            src="assets/images/thumbs/flag5.png"
                            alt="South Korea"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          South Korea
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
                    <Link to="#" className="selected-text text-heading text-sm py-8">
                      {selectedCurrency}
                    </Link>
                    <ul className="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8" style={{ zIndex: 1003 }}>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange('USD')}
                        >
                          <img
                            src="assets/images/thumbs/flag1.png"
                            alt="USD"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          USD
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange('Yen')}
                        >
                          <img
                            src="assets/images/thumbs/flag2.png"
                            alt="Yen"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          Yen
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange('Franc')}
                        >
                          <img
                            src="assets/images/thumbs/flag3.png"
                            alt="Franc"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          Franc
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange('EURO')}
                        >
                          <img
                            src="assets/images/thumbs/flag4.png"
                            alt="EURO"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          EURO
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange('BDT')}
                        >
                          <img
                            src="assets/images/thumbs/flag6.png"
                            alt="BDT"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          BDT
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange('WON')}
                        >
                          <img
                            src="assets/images/thumbs/flag5.png"
                            alt="WON"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          WON
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div
                className="search-category style-two d-flex search-form d-sm-flex position-relative"
                style={{ minHeight: '48px', overflow: 'visible' }}
              >
                {/* <select
                  defaultValue={1}
                  className="js-example-basic-single border border-gray-200 border-end-0 rounded-0 border-0"
                  name="state"
                >
                  <option value={1}>All Categories</option>
                  <option value={1}>Grocery</option>
                  <option value={1}>Breakfast & Dairy</option>
                  <option value={1}>Vegetables</option>
                  <option value={1}>Milks and Dairies</option>
                  <option value={1}>Pet Foods & Toy</option>
                  <option value={1}>Breads & Bakery</option>
                  <option value={1}>Fresh Seafood</option>
                  <option value={1}>Frozen Foods</option>
                  <option value={1}>Noodles & Rice</option>
                  <option value={1}>Ice Cream</option>
                </select> */}
                <SearchBar className="flex-grow-1" />
              </div>
            </div>
            {/* Header Middle Right */}
            <div className="header-right flex-align d-lg-block d-none">
              <div className="header-two-activities flex-align flex-wrap gap-32">
                <div className="on-hover-item">
                  <button
                    onClick={handleUserDropdownToggle}
                    className="flex-align flex-column gap-8 item-hover-two"
                  >
                    <span className="text-2xl text-white d-flex position-relative item-hover__text">
                      {token && user?.name ? (
                        <i className="ph ph-user" />
                      ) : (
                        <Link to="/account">
                          <i className="ph ph-user text-white" />
                        </Link>
                      )}
                    </span>
                    <span className="text-md text-white item-hover__texts d-none d-lg-flex">
                      {token && user?.name ? (
                        `Hi, ${user.name}`
                      ) : (
                        <Link to="/account" className="text-white">
                          Login
                        </Link>
                      )}
                    </span>
                  </button>
                  {token && user?.name && (
                    <ul
                      className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${userDropdownOpen ? 'open' : ''}`}
                      style={{ right: 0, width: '150px', zIndex: 1003 }}
                    >
                      <li className="common-dropdown__item nav-submenu__item">
                        <Link
                          to="/user-details"
                          className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          User Details
                        </Link>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <button
                          onClick={handleLogout}
                          className="common-dropdown__link nav-submenu__link hover-bg-neutral-100 w-100 text-start"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
                <Link
                  to="/wishlist"
                  className="flex-align flex-column gap-8 item-hover-two"
                >
                  <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                    <i className="ph ph-heart" />
                    <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                      2
                    </span>
                  </span>
                  <span className="text-md text-white item-hover__text d-none d-lg-flex">
                    Wishlist
                  </span>
                </Link>
                <Link
                  to="/compare"
                  className="flex-align flex-column gap-8 item-hover-two"
                >
                  <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                    <i className="ph-fill ph-shuffle" />
                    <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                      2
                    </span>
                  </span>
                  <span className="text-md text-white item-hover__text d-none d-lg-flex">
                    Compare
                  </span>
                </Link>
                <Link
                  to="/cart"
                  className="flex-align flex-column gap-8 item-hover-two"
                >
                  <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                    <i className="ph ph-shopping-cart-simple" />
                    <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                      2
                    </span>
                  </span>
                  <span className="text-md text-white item-hover__text d-none d-lg-flex">
                    Cart
                  </span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {/* Header Two */}
      <header
        className={`header bg-white border-bottom border-gray-100 ${scroll ? 'fixed-header' : ''}`}
        style={{ zIndex: 1000, overflow: 'visible' }}
      >
        <div className="container container-lg" style={{ overflow: 'visible' }}>
          <nav className="header-inner d-flex justify-content-between gap-8" style={{ overflow: 'visible' }}>
            <div className="flex-align menu-category-wrapper">
              {/* Category Dropdown */}
              <div
                className={`category-two ${category === false ? 'd-block' : 'd-none'}`}
              >
                <button
                  onClick={handleCategoryToggle}
                  type="button"
                  className="category__button flex-align gap-8 fw-medium bg-main-two-600 p-16 text-white"
                >
                  <span className="icon text-2xl d-xs-flex d-none">
                    <i className="ph ph-dots-nine" />
                  </span>
                  <span className="d-sm-flex d-none">All</span> Categories
                  <span className="arrow-icon text-xl d-flex">
                    <i className="ph ph-caret-down" />
                  </span>
                </button>
                <div
                  className={`responsive-dropdown cat common-dropdown d-lg-none d-block nav-submenu p-0 submenus-submenu-wrapper shadow-none border border-gray-100 ${activeCategory ? 'active' : ''}`}
                  style={{ zIndex: 1003 }}
                >
                  <button
                    onClick={() => {
                      handleCategoryToggle();
                      setActiveIndexCat(null);
                    }}
                    type="button"
                    className="close-responsive-dropdown rounded-circle text-xl position-absolute inset-inline-end-0 inset-block-start-0 mt-4 me-8 d-lg-none d-flex"
                  >
                    <i className="ph ph-x" />
                  </button>
                  <div className="logo px-16 d-lg-none d-block">
                    <Link to="/" className="link">
                      <img src="assets/images/logo/logo.png" alt="Logo" />
                    </Link>
                  </div>
                  <ul className="scroll-sm p-0 py-8 overflow-y-auto">
                    <li
                      onClick={() => handleCatClick(0)}
                      className={`has-submenus-submenu ${activeIndexCat === 0 ? 'active' : ''}`}
                    >
                      <Link
                        onClick={() => setActiveIndexCat(null)}
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span>Cell Phone</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div
                        className={`submenus-submenu py-16 ${activeIndexCat === 0 ? 'open' : ''}`}
                      >
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Cell Phone
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Samsung</Link>
                          </li>
                          <li>
                            <Link to="/shop">Iphone</Link>
                          </li>
                          <li>
                            <Link to="/shop">Vivo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Oppo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Itel</Link>
                          </li>
                          <li>
                            <Link to="/shop">Realme</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    {/* Add other category items as needed */}
                  </ul>
                </div>
              </div>
              <div
                className={`category main on-hover-item bg-main-600 text-white ${category === true ? 'd-block' : 'd-none'}`}
              >
                <button
                  type="button"
                  className="category__button flex-align gap-8 fw-medium p-16 border-end border-start border-gray-100 text-white"
                >
                  <span className="icon text-2xl d-xs-flex d-none">
                    <i className="ph ph-dots-nine" />
                  </span>
                  <span className="d-sm-flex d-none">All</span> Categoriesss
                  <span className="arrow-icon text-xl d-flex">
                    <i className="ph ph-caret-down" />
                  </span>
                </button>
                <div
  className="responsive-dropdown on-hover-dropdown common-dropdown nav-submenu p-0 submenus-submenu-wrapper"
  style={{ zIndex: 1003 }}
>
  <button
    type="button"
    className="close-responsive-dropdown rounded-circle text-xl position-absolute inset-inline-end-0 inset-block-start-0 mt-4 me-8 d-lg-none d-flex"
  >
    <i className="ph ph-x" />
  </button>
  <div className="logo px-16 d-lg-none d-block">
    <Link to="/" className="link">
      {/* <img src="assets/images/logo/logo.png" alt="Logo" /> */}
    </Link>
  </div>
  {filterdCategoryByParents?.map((category) => (
    <ul
      key={category?.id}
      className="scroll-sm p-0 py-8 w-300 max-h-400 overflow-y-auto"
    >
      <li className="has-submenus-submenu">
        <Link
          to={`/category/${category?.id}`}
          className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
        >
          <span>{category?.categoryName}</span>
          <span className="icon text-md d-flex ms-auto">
            <i className="ph ph-caret-right" />
          </span>
        </Link>
        <div className="submenus-submenu py-16">
          <h6 className="text-lg px-16 submenus-submenu__title">
            {category?.categoryName}
          </h6>
          <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
            {categoryApi?.categories?.filter((subCategory) => subCategory?.parent_id === category?.id)?.map((subCategory) => (
                <li key={subCategory?.id}>
                  <Link to={`/shop/${subCategory?.id}`}>
                    {subCategory?.categoryName}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </li>
    </ul>
  ))}
</div>
              </div>
              {/* Menu */}
              <div className="header-menu d-lg-block d-none">
                <ul className="nav-menu flex-align">
                  <li className="on-hover-item nav-menu__item has-submenu">
                    <Link to="#" className="nav-menu__link">
                      Home
                    </Link>
                    <ul className="on-hover-dropdown common-dropdown nav-submenu scroll-sm" style={{ zIndex: 1003 }}>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Home Grocery
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/index-two"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Home Electronics
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/index-three"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Home Fashion
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="on-hover-item nav-menu__item has-submenu">
                    <Link to="#" className="nav-menu__link">
                      Shop
                    </Link>
                    <ul className="on-hover-dropdown common-dropdown nav-submenu scroll-sm" style={{ zIndex: 1003 }}>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/shop"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Shop
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/product-details"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Shop Details
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/product-details-two"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Shop Details Two
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="on-hover-item nav-menu__item has-submenu">
                    <span className="badge-notification bg-warning-600 text-white text-sm py-2 px-8 rounded-4">
                      New
                    </span>
                    <Link to="#" className="nav-menu__link">
                      Pages
                    </Link>
                    <ul className="on-hover-dropdown common-dropdown nav-submenu scroll-sm" style={{ zIndex: 1003 }}>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/cart"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Cart
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/wishlist"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Wishlist
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/checkout"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Checkout
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/become-seller"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Become Seller
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/account"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Account
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="on-hover-item nav-menu__item has-submenu">
                    <span className="badge-notification bg-tertiary-600 text-white text-sm py-2 px-8 rounded-4">
                      New
                    </span>
                    <Link to="#" className="nav-menu__link">
                      Vendors
                    </Link>
                    <ul className="on-hover-dropdown common-dropdown nav-submenu scroll-sm" style={{ zIndex: 1003 }}>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/vendor"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Vendor
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/vendor-details"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Vendor Details
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/vendor-two"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Vendor Two
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/vendor-two-details"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Vendor Two Details
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="on-hover-item nav-menu__item has-submenu">
                    <Link to="#" className="nav-menu__link">
                      Blog
                    </Link>
                    <ul className="on-hover-dropdown common-dropdown nav-submenu scroll-sm" style={{ zIndex: 1003 }}>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/blog"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Blog
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/blog-details"
                          className={(navData) =>
                            navData.isActive
                              ? 'common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage'
                              : 'common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                          }
                        >
                          Blog Details
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-menu__item">
                    <NavLink
                      to="/contact"
                      className={(navData) =>
                        navData.isActive
                          ? 'nav-menu__link activePage'
                          : 'nav-menu__link'
                      }
                    >
                      Contact Us
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            {/* Header Right */}
            <div className="header-right flex-align">
              <div className="select-dropdown-for-home-two d-lg-block d-none">
                <ul className="header-top__right style-two flex-align flex-wrap">
                  <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
                    <Link to="#" className="selected-text text-heading text-sm py-8">
                      {selectedLanguage}
                    </Link>
                    <ul className="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8" style={{ zIndex: 1003 }}>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange('English')}
                        >
                          <img
                            src="assets/images/thumbs/flag1.png"
                            alt="English"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          English
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange('Japan')}
                        >
                          <img
                            src="assets/images/thumbs/flag2.png"
                            alt="Japan"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          Japan
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange('French')}
                        >
                          <img
                            src="assets/images/thumbs/flag3.png"
                            alt="French"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          French
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange('Germany')}
                        >
                          <img
                            src="assets/images/thumbs/flag4.png"
                            alt="Germany"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          Germany
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange('Bangladesh')}
                        >
                          <img
                            src="assets/images/thumbs/flag6.png"
                            alt="Bangladesh"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          Bangladesh
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange('South Korea')}
                        >
                          <img
                            src="assets/images/thumbs/flag5.png"
                            alt="South Korea"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          South Korea
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
                    <Link to="#" className="selected-text text-heading text-sm py-8">
                      {selectedCurrency}
                    </Link>
                    <ul className="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8" style={{ zIndex: 1003 }}>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange('USD')}
                        >
                          <img
                            src="assets/images/thumbs/flag1.png"
                            alt="USD"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          USD
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange('Yen')}
                        >
                          <img
                            src="assets/images/thumbs/flag2.png"
                            alt="Yen"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          Yen
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange('Franc')}
                        >
                          <img
                            src="assets/images/thumbs/flag3.png"
                            alt="Franc"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          Franc
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange('EURO')}
                        >
                          <img
                            src="assets/images/thumbs/flag4.png"
                            alt="EURO"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          EURO
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange('BDT')}
                        >
                          <img
                            src="assets/images/thumbs/flag6.png"
                            alt="BDT"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          BDT
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange('WON')}
                        >
                          <img
                            src="assets/images/thumbs/flag5.png"
                            alt="WON"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          WON
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="me-8 d-lg-none d-block">
                <div className="header-two-activities flex-align flex-wrap gap-32">
                  <Link
                    to={token ? '/user-details' : '/account'}
                    className="flex-align flex-column gap-8 item-hover-two"
                  >
                    <span className="text-2xl text-white d-flex position-relative item-hover__text">
                      <i className="ph ph-user" />
                    </span>
                    <span className="text-md text-white item-hover__text d-none d-lg-flex">
                      {token && user?.name ? `Hi, ${user.name}` : 'Login'}
                    </span>
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex-align flex-column gap-8 item-hover-two"
                  >
                    <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                      <i className="ph ph-heart" />
                      <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                        2
                      </span>
                    </span>
                    <span className="text-md text-white item-hover__text d-none d-lg-flex">
                      Wishlist
                    </span>
                  </Link>
                  <Link
                    to="/cart"
                    className="flex-align flex-column gap-8 item-hover-two"
                  >
                    <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                      <i className="ph-fill ph-shuffle" />
                      <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                        2
                      </span>
                    </span>
                    <span className="text-md text-white item-hover__text d-none d-lg-flex">
                      Compare
                    </span>
                  </Link>
                  <Link
                    to="/cart"
                    className="flex-align flex-column gap-8 item-hover-two"
                  >
                    <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                      <i className="ph ph-shopping-cart-simple" />
                      <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                        2
                      </span>
                    </span>
                    <span className="text-md text-white item-hover__text d-none d-lg-flex">
                      Cart
                    </span>
                  </Link>
                </div>
              </div>
              <button
                onClick={handleMenuToggle}
                type="button"
                className="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex"
              >
                <i className="ph ph-list" />
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default HeaderThree;
