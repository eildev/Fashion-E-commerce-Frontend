import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetVariantApiQuery } from '../../redux/features/api/variantApi';
import ReactSlider from 'react-slider';

import toast from 'react-hot-toast';
import { addToCart } from '../../redux/features/slice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCategoryQuery } from '../../redux/features/api/categoryApi';

const ShopSection = () => {
    const dispatch = useDispatch();

    const [priceRange, setPriceRange] = useState([10, 10000]);
    const { data, isLoading, error } = useGetVariantApiQuery();
    const { data: categoryApi, isLoading: categoryApiLoad, error: categoryApiError } = useGetCategoryQuery();
    console.log("shop page", data);

    const [grid, setGrid] = useState(false);
    const [active, setActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const sidebarController = () => {
        setActive(!active);
    };

    const paginatedData = data?.variant?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(data?.variant?.length / itemsPerPage);


    const categories = categoryApi?.categories?.filter(category => category.parent_id === null);


    const handleFilter = () => {
        console.log('Selected Price Range:', priceRange);
        // You can call your API or filter your product list here
        // Example:
        // fetchProducts({ minPrice: priceRange[0], maxPrice: priceRange[1] });
        
    };




        const cartItems = useSelector((state) => state.cart.cartItems);
    
        // const productImages = [
        //     "assets/images/thumbs/product-details-two-thumb1.png",
        //     "assets/images/thumbs/product-details-two-thumb2.png",
        //     "assets/images/thumbs/product-details-two-thumb3.png",
        //     "assets/images/thumbs/product-details-two-thumb1.png",
        //     "assets/images/thumbs/product-details-two-thumb2.png",
        // ];
    
    
        // increment & decrement
   
    

    
        // console.log(item?.variant_image[0]);
    
        const settingsThumbs = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            focusOnSelect: true,
        };
    
    
    
    
        
    
        // const { data, isLoading, error } = useGetProductByDetailsQuery(id);
        const { user } = useSelector((state) => state.auth);
      
        const filteredCartItems = cartItems.filter((item) => {
          if (user?.id) {
            return item.user_id === user.id;
          } else {
            return item.user_id === null;
          }
        });
      
       
      
    //   const categoryId = data?.data?.category_id
      
        // const navigate = useNavigate();
      
      
       
        
        const handleAddToCart = (eItem) => {

            const stockAvailable = eItem?.product_stock?.StockQuantity > 0;
    
            const matchedItem = filteredCartItems.find(
              (item) => item.id === eItem?.id
            );
          const stockLimit = matchedItem?.product_stock?.StockQuantity || eItem?.product_stock?.StockQuantity || 0;
        
          const totalRequested = (matchedItem?.quantity || 0) + 1;
        
         
          if (totalRequested > stockLimit) {
            toast.error("Cannot add more than available stock!");
            return;
          }
        
          const newProduct = {
            ...eItem,
            quantity: 1,
            user_id: user?.id || null,
          };
        
          dispatch(addToCart(newProduct));
          toast.success("Added to Cart");
        };
        
      
    
      
    
    

    return (
        <section className="shop py-80">
            <div className={`side-overlay ${active && 'show'}`}></div>
            <div className="container container-lg">
                <div className="row">
                    {/* Sidebar Start */}
                    <div className="col-lg-3">
                        <div className={`shop-sidebar ${active && "active"}`}>
                            <button onClick={sidebarController}
                                type="button"
                                className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
                            >
                                <i className="ph ph-x" />
                            </button>
                            <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                                    Product Category
                                </h6>
                                <ul className="max-h-540 overflow-y-auto scroll-sm">
                                    <li className="mb-24">
                                        <Link
                                            to="/product-details-two"
                                            className="text-gray-900 hover-text-main-600"
                                        >
                                            Mobile &amp; Accessories (12)
                                        </Link>
                                    </li>
                                    <li className="mb-24">
                                        <Link
                                            to="/product-details-two"
                                            className="text-gray-900 hover-text-main-600"
                                        >
                                            Laptop (12)
                                        </Link>
                                    </li>
                                    <li className="mb-24">
                                        <Link
                                            to="/product-details-two"
                                            className="text-gray-900 hover-text-main-600"
                                        >
                                            Electronics (12)
                                        </Link>
                                    </li>
                                    <li className="mb-24">
                                        <Link
                                            to="/product-details-two"
                                            className="text-gray-900 hover-text-main-600"
                                        >
                                            Smart Watch (12)
                                        </Link>
                                    </li>
                                    <li className="mb-24">
                                        <Link
                                            to="/product-details-two"
                                            className="text-gray-900 hover-text-main-600"
                                        >
                                            Storage (12)
                                        </Link>
                                    </li>
                                    <li className="mb-24">
                                        <Link
                                            to="/product-details-two"
                                            className="text-gray-900 hover-text-main-600"
                                        >
                                            Portable Devices (12)
                                        </Link>
                                    </li>
                                    <li className="mb-24">
                                        <Link
                                            to="/product-details-two"
                                            className="text-gray-900 hover-text-main-600"
                                        >
                                            Action Camera (12)
                                        </Link>
                                    </li>
                                    <li className="mb-24">
                                        <Link
                                            to="/product-details-two"
                                            className="text-gray-900 hover-text-main-600"
                                        >
                                            Smart Gadget (12)
                                        </Link>
                                    </li>
                                    <li className="mb-24">
                                        <Link
                                            to="/product-details-two"
                                            className="text-gray-900 hover-text-main-600"
                                        >
                                            Monitor (12)
                                        </Link>
                                    </li>
                                    <li className="mb-24">
                                        <Link
                                            to="/product-details-two"
                                            className="text-gray-900 hover-text-main-600"
                                        >
                                            Smart TV (12)
                                        </Link>
                                    </li>
                                    <li className="mb-24">
                                        <Link
                                            to="/product-details-two"
                                            className="text-gray-900 hover-text-main-600"
                                        >
                                            Camera (12)
                                        </Link>
                                    </li>
                                    <li className="mb-24">
                                        <Link
                                            to="/product-details-two"
                                            className="text-gray-900 hover-text-main-600"
                                        >
                                            Monitor Stand (12)
                                        </Link>
                                    </li>
                                    <li className="mb-0">
                                        <Link
                                            to="/product-details-two"
                                            className="text-gray-900 hover-text-main-600"
                                        >
                                            Headphone (12)
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                                    Filter by Price
                                </h6>
                                <div className="custom--range">
                                    <ReactSlider
                                        className="horizontal-slider"
                                        thumbClassName="example-thumb"
                                        trackClassName="example-track"
                                        value={priceRange}
                                        onChange={setPriceRange}
                                        ariaLabel={['Lower thumb', 'Upper thumb']}
                                        ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                        renderThumb={(props, state) => {
                                            const { key, ...restProps } = props;
                                            return (
                                                <div {...restProps} key={state.index}>
                                                    {state.valueNow}
                                                </div>
                                            );
                                        }}
                                        pearling
                                        minDistance={150}
                                        min={10}
                                        max={10000} 
                                    />

                                    <br />
                                    <br />
                                    <div className="flex-between flex-wrap-reverse gap-8 mt-24 ">
                                        <button type="button" className="btn btn-main h-40 flex-align">
                                            Filter{" "}
                                        </button>

                                    </div>
                                </div>
                            </div>

                            <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                                    Filter by Rating
                                </h6>
                                <div className="flex-align gap-8 position-relative mb-20">
                                    <label
                                        className="position-absolute w-100 h-100 cursor-pointer"
                                        htmlFor="rating5"
                                    >
                                        {" "}
                                    </label>
                                    <div className="common-check common-radio mb-0">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="rating5"
                                        />
                                    </div>
                                    <div
                                        className="progress w-100 bg-gray-100 rounded-pill h-8"
                                        role="progressbar"
                                        aria-label="Basic example"
                                        aria-valuenow={70}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="progress-bar bg-main-600 rounded-pill"
                                            style={{ width: "70%" }}
                                        />
                                    </div>
                                    <div className="flex-align gap-4">
                                        <span className="text-xs fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                    </div>
                                    <span className="text-gray-900 flex-shrink-0">124</span>
                                </div>
                                <div className="flex-align gap-8 position-relative mb-20">
                                    <label
                                        className="position-absolute w-100 h-100 cursor-pointer"
                                        htmlFor="rating4"
                                    >
                                        {" "}
                                    </label>
                                    <div className="common-check common-radio mb-0">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="rating4"
                                        />
                                    </div>
                                    <div
                                        className="progress w-100 bg-gray-100 rounded-pill h-8"
                                        role="progressbar"
                                        aria-label="Basic example"
                                        aria-valuenow={50}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="progress-bar bg-main-600 rounded-pill"
                                            style={{ width: "50%" }}
                                        />
                                    </div>
                                    <div className="flex-align gap-4">
                                        <span className="text-xs fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-gray-400 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                    </div>
                                    <span className="text-gray-900 flex-shrink-0">52</span>
                                </div>
                                <div className="flex-align gap-8 position-relative mb-20">
                                    <label
                                        className="position-absolute w-100 h-100 cursor-pointer"
                                        htmlFor="rating3"
                                    >
                                        {" "}
                                    </label>
                                    <div className="common-check common-radio mb-0">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="rating3"
                                        />
                                    </div>
                                    <div
                                        className="progress w-100 bg-gray-100 rounded-pill h-8"
                                        role="progressbar"
                                        aria-label="Basic example"
                                        aria-valuenow={35}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="progress-bar bg-main-600 rounded-pill"
                                            style={{ width: "35%" }}
                                        />
                                    </div>
                                    <div className="flex-align gap-4">
                                        <span className="text-xs fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-gray-400 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-gray-400 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                    </div>
                                    <span className="text-gray-900 flex-shrink-0">12</span>
                                </div>
                                <div className="flex-align gap-8 position-relative mb-20">
                                    <label
                                        className="position-absolute w-100 h-100 cursor-pointer"
                                        htmlFor="rating2"
                                    >
                                        {" "}
                                    </label>
                                    <div className="common-check common-radio mb-0">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="rating2"
                                        />
                                    </div>
                                    <div
                                        className="progress w-100 bg-gray-100 rounded-pill h-8"
                                        role="progressbar"
                                        aria-label="Basic example"
                                        aria-valuenow={20}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="progress-bar bg-main-600 rounded-pill"
                                            style={{ width: "20%" }}
                                        />
                                    </div>
                                    <div className="flex-align gap-4">
                                        <span className="text-xs fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-gray-400 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-gray-400 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-gray-400 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                    </div>
                                    <span className="text-gray-900 flex-shrink-0">5</span>
                                </div>
                                <div className="flex-align gap-8 position-relative mb-0">
                                    <label
                                        className="position-absolute w-100 h-100 cursor-pointer"
                                        htmlFor="rating1"
                                    >
                                        {" "}
                                    </label>
                                    <div className="common-check common-radio mb-0">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="rating1"
                                        />
                                    </div>
                                    <div
                                        className="progress w-100 bg-gray-100 rounded-pill h-8"
                                        role="progressbar"
                                        aria-label="Basic example"
                                        aria-valuenow={5}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="progress-bar bg-main-600 rounded-pill"
                                            style={{ width: "5%" }}
                                        />
                                    </div>
                                    <div className="flex-align gap-4">
                                        <span className="text-xs fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-gray-400 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-gray-400 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-gray-400 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-xs fw-medium text-gray-400 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                    </div>
                                    <span className="text-gray-900 flex-shrink-0">2</span>
                                </div>
                            </div>
                            {/* <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                                    Filter by Color
                                </h6>
                                <ul className="max-h-540 overflow-y-auto scroll-sm">
                                    <li className="mb-24">
                                        <div className="form-check common-check common-radio checked-black">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="color"
                                                id="color1"
                                            />
                                            <label className="form-check-label" htmlFor="color1">
                                                Black(12)
                                            </label>
                                        </div>
                                    </li>
                                    <li className="mb-24">
                                        <div className="form-check common-check common-radio checked-primary">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="color"
                                                id="color2"
                                            />
                                            <label className="form-check-label" htmlFor="color2">
                                                Blue (12)
                                            </label>
                                        </div>
                                    </li>
                                    <li className="mb-24">
                                        <div className="form-check common-check common-radio checked-gray">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="color"
                                                id="color3"
                                            />
                                            <label className="form-check-label" htmlFor="color3">
                                                Gray (12)
                                            </label>
                                        </div>
                                    </li>
                                    <li className="mb-24">
                                        <div className="form-check common-check common-radio checked-success">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="color"
                                                id="color4"
                                            />
                                            <label className="form-check-label" htmlFor="color4">
                                                Green (12)
                                            </label>
                                        </div>
                                    </li>
                                    <li className="mb-24">
                                        <div className="form-check common-check common-radio checked-danger">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="color"
                                                id="color5"
                                            />
                                            <label className="form-check-label" htmlFor="color5">
                                                Red (12)
                                            </label>
                                        </div>
                                    </li>
                                    <li className="mb-24">
                                        <div className="form-check common-check common-radio checked-white">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="color"
                                                id="color6"
                                            />
                                            <label className="form-check-label" htmlFor="color6">
                                                White (12)
                                            </label>
                                        </div>
                                    </li>
                                    <li className="mb-0">
                                        <div className="form-check common-check common-radio checked-purple">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="color"
                                                id="color7"
                                            />
                                            <label className="form-check-label" htmlFor="color7">
                                                Purple (12)
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div> */}
                            <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                                    Filter by Brand
                                </h6>
                                <ul className="max-h-540 overflow-y-auto scroll-sm">
                                    <li className="mb-24">
                                        <div className="form-check common-check common-radio">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="color"
                                                id="brand1"
                                            />
                                            <label className="form-check-label" htmlFor="brand1">
                                                Apple
                                            </label>
                                        </div>
                                    </li>
                                    <li className="mb-24">
                                        <div className="form-check common-check common-radio">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="color"
                                                id="brand2"
                                            />
                                            <label className="form-check-label" htmlFor="brand2">
                                                Samsung
                                            </label>
                                        </div>
                                    </li>
                                    <li className="mb-24">
                                        <div className="form-check common-check common-radio">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="color"
                                                id="brand3"
                                            />
                                            <label className="form-check-label" htmlFor="brand3">
                                                Microsoft
                                            </label>
                                        </div>
                                    </li>
                                    <li className="mb-24">
                                        <div className="form-check common-check common-radio">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="color"
                                                id="brand4"
                                            />
                                            <label className="form-check-label" htmlFor="brand4">
                                                Apple
                                            </label>
                                        </div>
                                    </li>
                                    <li className="mb-24">
                                        <div className="form-check common-check common-radio">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="color"
                                                id="brand5"
                                            />
                                            <label className="form-check-label" htmlFor="brand5">
                                                HP
                                            </label>
                                        </div>
                                    </li>
                                    <li className="mb-24">
                                        <div className="form-check common-check common-radio">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="color"
                                                id="DELL"
                                            />
                                            <label className="form-check-label" htmlFor="DELL">
                                                DELL
                                            </label>
                                        </div>
                                    </li>
                                    <li className="mb-0">
                                        <div className="form-check common-check common-radio">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="color"
                                                id="Redmi"
                                            />
                                            <label className="form-check-label" htmlFor="Redmi">
                                                Redmi
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="shop-sidebar__box rounded-8">
                                <img src="assets/images/thumbs/advertise-img1.png" alt="" />
                            </div>
                        </div>
                    </div>
                    {/* Sidebar End */}
                    {/* Content Start */}
                    <div className="col-lg-9">
                        {/* Top Start */}
                        <div className="flex-between gap-16 flex-wrap mb-40">
                            <span className="text-gray-900">
                                Showing {(currentPage - 1) * itemsPerPage + 1} -{' '}
                                {Math.min(currentPage * itemsPerPage, data?.variant?.length || 0)} of{' '}
                                {data?.variant?.length || 0} results
                            </span>
                            <div className="position-relative flex-align gap-16 flex-wrap">
                                <div className="list-grid-btns flex-align gap-16">
                                    <button
                                        onClick={() => setGrid(true)}
                                        type="button"
                                        className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${grid === true && 'border-main-600 text-white bg-main-600'
                                            }`}
                                    >
                                        <i className="ph-bold ph-list-dashes" />
                                    </button>
                                    <button
                                        onClick={() => setGrid(false)}
                                        type="button"
                                        className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${grid === false && 'border-main-600 text-white bg-main-600'
                                            }`}
                                    >
                                        <i className="ph ph-squares-four" />
                                    </button>
                                </div>
                                <div className="position-relative text-gray-500 flex-align gap-4 text-14">
                                    <label htmlFor="sorting" className="text-inherit flex-shrink-0">
                                        Sort by:{' '}
                                    </label>
                                    <select
                                        defaultValue={1}
                                        className="form-control common-input px-14 py-14 text-inherit rounded-6 w-auto"
                                        id="sorting"
                                    >
                                        <option value={1}>Popular</option>
                                        <option value={2}>Latest</option>
                                        <option value={3}>Trending</option>
                                        <option value={4}>Matches</option>
                                    </select>
                                </div>
                                <button
                                    onClick={sidebarController}
                                    type="button"
                                    className="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
                                >
                                    <i className="ph-bold ph-funnel" />
                                </button>
                            </div>
                        </div>
                        {/* Top End */}

                        {/* Product List/Grid */}
                        <div className={`list-grid-wrapper ${grid && 'list-view'}`}>
                            {paginatedData?.map((item, i) => (
                                <div
                                    key={i}
                                    className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
                                >
                                    <Link
                                        to={`/product-details-two/${item.id}`}
                                        className="product-card__thumb flex-center rounded-8 border position-relative"
                                    >
                                        <img
                                            src={
                                                item?.variant_image?.[0]?.image
                                                    ? `http://127.0.0.1:8000/${item.variant_image[0].image}`
                                                    : 'assets/images/thumbs/product-two-img1.png'
                                            }
                                            alt=""
                                            className="w-full h-auto object-contain rounded-8"
                                        />
                                        <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                            Best Sale
                                        </span>
                                    </Link>
                                    <div className="product-card__content mt-16">
                                        <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                            <Link to={`/product-details-two/${item.id}`}
                                                className="link text-line-2" tabIndex={0}>
                                                {item?.product?.product_name}
                                            </Link>
                                        </h6>
                                        <div className="flex-align mb-20 mt-16 gap-6">
                                            <span className="text-xs fw-medium text-gray-500">4.8</span>
                                            <span className="text-15 fw-medium text-warning-600 d-flex">
                                                <i className="ph-fill ph-star" />
                                            </span>
                                            <span className="text-xs fw-medium text-gray-500">(17k)</span>
                                        </div>
                                        {/* <div className="mt-8">
                      <div
                        className="progress w-100 bg-color-three rounded-pill h-4"
                        role="progressbar"
                        aria-valuenow={35}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="progress-bar bg-main-two-600 rounded-pill"
                          style={{ width: '35%' }}
                        />
                      </div>
                      <span className="text-gray-900 text-xs fw-medium mt-8">Sold: 18/35</span>
                    </div> */}
                                        <div className="product-card__price my-20">
                                            <span className="text-gray-400 text-md fw-semibold text-decoration-line-through me-5">
                                                $28.99
                                            </span>
                                            <span className="text-heading text-md fw-semibold">
                                                $ {item?.regular_price}{' '}
                                                <span className="text-gray-500 fw-normal">/Qty</span>{' '}
                                            </span>
                                        </div>
                                        <Link
                                            to="/cart"
                                            onClick={()=>handleAddToCart(item)}
                                            className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                                            tabIndex={0}
                                        >
                                            Add To Cart <i className="ph ph-shopping-cart" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Start */}
                        <ul className="pagination flex-center flex-wrap gap-16 mt-40">
                            {/* Previous Button */}
                            <li className="page-item">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="page-link h-64 w-64 flex-center text-xl rounded-8 fw-medium text-neutral-600 border border-gray-100 disabled:opacity-50"
                                >
                                    <i className="ph-bold ph-arrow-left" />
                                </button>
                            </li>

                            {/* Page Number Buttons */}
                            {(() => {
                                const pages = [];
                                const maxVisiblePages = 5;
                                let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                                let endPage = startPage + maxVisiblePages - 1;

                                if (endPage > totalPages) {
                                    endPage = totalPages;
                                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                                }

                                if (startPage > 1) {
                                    pages.push(
                                        <li key="start">
                                            <button
                                                onClick={() => setCurrentPage(1)}
                                                className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                            >
                                                1
                                            </button>
                                        </li>
                                    );

                                    if (startPage > 2) {
                                        pages.push(
                                            <li key="dots-start" className="text-gray-400 text-md flex-center w-64">
                                                ...
                                            </li>
                                        );
                                    }
                                }

                                for (let i = startPage; i <= endPage; i++) {
                                    pages.push(
                                        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                                            <button
                                                onClick={() => setCurrentPage(i)}
                                                className={`page-link h-64 w-64 flex-center text-md rounded-8 fw-medium border ${currentPage === i
                                                        ? 'text-white bg-main-600 border-main-600'
                                                        : 'text-neutral-600 border-gray-100'
                                                    }`}
                                            >
                                                {i}
                                            </button>
                                        </li>
                                    );
                                }

                                if (endPage < totalPages) {
                                    if (endPage < totalPages - 1) {
                                        pages.push(
                                            <li key="dots-end" className="text-gray-400 text-md flex-center w-64">
                                                ...
                                            </li>
                                        );
                                    }

                                    pages.push(
                                        <li key="end">
                                            <button
                                                onClick={() => setCurrentPage(totalPages)}
                                                className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                            >
                                                {totalPages}
                                            </button>
                                        </li>
                                    );
                                }

                                return pages;
                            })()}

                            {/* Next Button */}
                            <li className="page-item">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="page-link h-64 w-64 flex-center text-xl rounded-8 fw-medium text-neutral-600 border border-gray-100 disabled:opacity-50"
                                >
                                    <i className="ph-bold ph-arrow-right" />
                                </button>
                            </li>
                        </ul>
                        {/* Pagination End */}
                    </div>
                    {/* Content End */}
                </div>
            </div>
        </section>
    );
};

export default ShopSection;
