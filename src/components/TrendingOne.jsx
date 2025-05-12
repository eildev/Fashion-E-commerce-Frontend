import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

const TrendingOne = ({data}) => {
    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <button
                type="button" onClick={onClick}
                className={` ${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1`}
            >
                <i className="ph ph-caret-right" />
            </button>
        );
    }
    function SamplePrevArrow(props) {
        const { className, onClick } = props;

        return (

            <button
                type="button"
                onClick={onClick}
                className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1`}
            >
                <i className="ph ph-caret-left" />
            </button>
        );
    }
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 3,

                },
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,

                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,

                },
            },

        ],
    };
    return (
        <section className="trending-productss pt-80">
            <div className="container container-lg">
                <div className="border border-gray-100 p-24 rounded-16">
                    <div className="section-heading mb-24">
                        <div className="flex-between flex-wrap gap-8">
                            <h5 className="mb-0">Trending Products</h5>
                            <ul
                                className="nav common-tab style-two nav-pills"
                                id="pills-tab"
                                role="tablist"
                            >
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link active"
                                        id="pills-all-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#pills-all"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-all"
                                        aria-selected="true"
                                    >
                                        All
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="pills-mobile-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#pills-mobile"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-mobile"
                                        aria-selected="false"
                                    >
                                        Mobile
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="pills-headphone-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#pills-headphone"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-headphone"
                                        aria-selected="false"
                                    >
                                        Headphone
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="pills-usb-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#pills-usb"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-usb"
                                        aria-selected="false"
                                    >
                                        USB
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="pills-camera-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#pills-camera"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-camera"
                                        aria-selected="false"
                                    >
                                        Camera
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="pills-laptop-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#pills-laptop"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-laptop"
                                        aria-selected="false"
                                    >
                                        Laptop
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="pills-accessories-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#pills-accessories"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-accessories"
                                        aria-selected="false"
                                    >
                                        Accessories
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="trending-products-box rounded-16 overflow-hidden flex-between position-relative mb-24">
                        <div className="d-md-block d-none ps-xxl-5 ps-md-4">
                            <img src="assets/images/oceane/nike.png" alt="" />
                        </div>
                        <div className="trending-products-box__content px-4 d-block w-100 text-center py-32">
                            <h6 className="mb-0 trending-products-box__title">
                                Laptop Pro <span className="h4 mb-0 fw-semibold">20%</span> off All
                                Time On Order Now $980
                            </h6>
                        </div>
                        <div className="d-md-block d-none pe-xxl-5 me-xxl-5 pe-md-4">
                            <img src="assets/images/oceane/puma.png" alt="" />
                        </div>
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="pills-all"
                            role="tabpanel"
                            aria-labelledby="pills-all-tab"
                            tabIndex={0}
                        >
                            <div className="recommended-slider">
                                <Slider {...settings}>
                                {
                                    data?.variant?.map(item => <div>
                                        <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                            <Link
                                                to={`/product-details-two/${item.id}`}
                                                className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                            >
                                                <span className="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                    Best Seller{" "}
                                                </span>
                                                <img
                    src={
                      item?.variant_image?.[0]?.image
                        ? `https://fashion-backend.eclipseposapp.com/${item.variant_image[0].image}`
                        : 'assets/images/thumbs/product-two-img1.png'
                    }
                    alt={item?.variant_name || 'Product Image'}
                    className="w-full h-auto object-contain rounded-8"
                  />
                                            </Link>
                                            <Link to={`/product-details-two/${item.id}`} className="product-card__content mt-16">
                                                <span className="text-main-600 bg-main-50 text-sm fw-medium py-4 px-8">
                                                    19%OFF
                                                </span>
                                                <h6 className="title text-lg fw-semibold my-16">
                                                    <Link
                                                        to={`/product-details-two/${item.id}`}
                                                        className="link text-line-2"
                                                        tabIndex={0}
                                                    >
                                                        {item?.variant_name}
                                                    </Link>
                                                </h6>
                                                <div className="flex-align gap-6">
                                                    <div className="flex-align gap-8">
                                                        <span className="text-15 fw-medium text-warning-600 d-flex">
                                                            <i className="ph-fill ph-star" />
                                                        </span>
                                                        <span className="text-15 fw-medium text-warning-600 d-flex">
                                                            <i className="ph-fill ph-star" />
                                                        </span>
                                                        <span className="text-15 fw-medium text-warning-600 d-flex">
                                                            <i className="ph-fill ph-star" />
                                                        </span>
                                                        <span className="text-15 fw-medium text-warning-600 d-flex">
                                                            <i className="ph-fill ph-star" />
                                                        </span>
                                                        <span className="text-15 fw-medium text-warning-600 d-flex">
                                                            <i className="ph-fill ph-star" />
                                                        </span>
                                                    </div>
                                                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                    <span className="text-xs fw-medium text-gray-500">
                                                        (12K)
                                                    </span>
                                                </div>
                                                <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                    Fulfilled by Marketpro
                                                </span>
                                                <div className="product-card__price mt-16 mb-30">
                                                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                        $28.99
                                                    </span>
                                                    <span className="text-heading text-md fw-semibold ">
                                                        ${item?.regular_price}{" "}
                                                        <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                    </span>
                                                </div>
                                                <span className="text-neutral-600">
                                                    Delivered by <span className="text-main-600">Aug 02</span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>)
                                }
                                    
                                  
                                </Slider>
                            </div>
                        </div>
                        {/* <div
                            className="tab-pane fade"
                            id="pills-mobile"
                            role="tabpanel"
                            aria-labelledby="pills-mobile-tab"
                            tabIndex={0}
                        >
                            <div className="row g-12">
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Best Seller{" "}
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img1.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-warning-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                New
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img2.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Sale 50%
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img3.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-success-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Sold
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img4.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Best Seller{" "}
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img5.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-warning-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                New
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img6.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-headphone"
                            role="tabpanel"
                            aria-labelledby="pills-headphone-tab"
                            tabIndex={0}
                        >
                            <div className="row g-12">
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Best Seller{" "}
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img1.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-warning-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                New
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img2.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Sale 50%
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img3.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-success-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Sold
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img4.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Best Seller{" "}
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img5.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-warning-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                New
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img6.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-usb"
                            role="tabpanel"
                            aria-labelledby="pills-usb-tab"
                            tabIndex={0}
                        >
                            <div className="row g-12">
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Best Seller{" "}
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img1.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-warning-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                New
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img2.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Sale 50%
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img3.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-success-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Sold
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img4.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Best Seller{" "}
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img5.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-warning-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                New
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img6.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-camera"
                            role="tabpanel"
                            aria-labelledby="pills-camera-tab"
                            tabIndex={0}
                        >
                            <div className="row g-12">
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Best Seller{" "}
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img1.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-warning-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                New
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img2.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Sale 50%
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img3.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-success-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Sold
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img4.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Best Seller{" "}
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img5.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-warning-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                New
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img6.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-laptop"
                            role="tabpanel"
                            aria-labelledby="pills-laptop-tab"
                            tabIndex={0}
                        >
                            <div className="row g-12">
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Best Seller{" "}
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img1.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-warning-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                New
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img2.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Sale 50%
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img3.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-success-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Sold
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img4.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Best Seller{" "}
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img5.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-warning-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                New
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img6.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-accessories"
                            role="tabpanel"
                            aria-labelledby="pills-accessories-tab"
                            tabIndex={0}
                        >
                            <div className="row g-12">
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Best Seller{" "}
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img1.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-warning-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                New
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img2.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Sale 50%
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img3.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-success-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Sold
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img4.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                Best Seller{" "}
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img5.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                        <Link
                                            to="/product-details-two"
                                            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                        >
                                            <span className="product-card__badge bg-warning-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                                New
                                            </span>
                                            <img
                                                src="assets/images/thumbs/product-two-img6.png"
                                                alt=""
                                                className="w-auto max-w-unset"
                                            />
                                        </Link>
                                        <div className="product-card__content mt-16">
                                            <span className="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8">
                                                19%OFF
                                            </span>
                                            <h6 className="title text-lg fw-semibold my-16">
                                                <Link
                                                    to="/product-details-two"
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    Instax Mini 12 Instant Film Camera - Green
                                                </Link>
                                            </h6>
                                            <div className="flex-align gap-6">
                                                <div className="flex-align gap-8">
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                    <span className="text-15 fw-medium text-warning-600 d-flex">
                                                        <i className="ph-fill ph-star" />
                                                    </span>
                                                </div>
                                                <span className="text-xs fw-medium text-gray-500">4.8</span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    (12K)
                                                </span>
                                            </div>
                                            <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                Fulfilled by Marketpro
                                            </span>
                                            <div className="product-card__price mt-16 mb-30">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    $28.99
                                                </span>
                                                <span className="text-heading text-md fw-semibold ">
                                                    $14.99{" "}
                                                    <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                                </span>
                                            </div>
                                            <span className="text-neutral-600">
                                                Delivered by <span className="text-main-600">Aug 02</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>

    )
}

export default TrendingOne