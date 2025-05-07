import React from 'react'
import Slider from 'react-slick';

const BrandTwo = ({data}) => {
    console.log("brand", data);
    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <button
                type="button" onClick={onClick}
                className={` ${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-two-600 text-xl hover-bg-main-two-600 hover-text-white transition-1`}
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
                className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-two-600 text-xl hover-bg-main-two-600 hover-text-white transition-1`}
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
        slidesToShow: 8,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1599,
                settings: {
                    slidesToShow: 7,

                },
            },
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 6,

                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 5,

                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 4,

                },
            },
            {
                breakpoint: 424,
                settings: {
                    slidesToShow: 3,

                },
            },
            {
                breakpoint: 359,
                settings: {
                    slidesToShow: 2,

                },
            },

        ],
    };
    return (
        <div className="top-brand py-80">
            <div className="container container-lg">
                <div className="border border-gray-100 p-24 rounded-16">
                    <div className="section-heading mb-24">
                        <div className="flex-between mr-point flex-wrap gap-8">
                            <h5 className="mb-0">Top Brands</h5>

                        </div>
                    </div>
                    <div className="top-brand__slider">
                        <Slider {...settings}>
                            {data?.Brands?.map(item =>   <div>
                                <div className="top-brand__item flex-center rounded-8 border border-gray-100 hover-border-gray-200 transition-1 px-8">
                                <img
                    src={
                      item?.image
                        ? `http://127.0.0.1:8000/${item?.image}`
                        : 'assets/images/thumbs/product-two-img1.png'
                    }
                    alt={item?.BrandName || 'Product Image'}
                    className="w-full h-auto object-contain rounded-8"
                  />
                                </div>
                            </div> )}
                          
                         
                        </Slider>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BrandTwo