import React from "react";
import { Link } from "react-router-dom";
// import image1 from '../../public/assets/images/oceane/men.png'
// import image2 from '../../public/assets/images/oceane/women.png'
const PromotionalThree = ({data}) => {
console.log("prpomot", data);
  return (
    <section className='promo-three pt-120   overflow-hidden'>
      <div className='container container-lg'>
        <div className='row gy-4'>
          <div className='col-sm-6'>
            <div
              className='promo-three-item bg-img rounded-16 overflow-hidden'
              style={{
                backgroundImage: `url('assets/images/oceane/men.png')`,
              }}
            >
              <div className='text-start'>
                <span className='text-white mb-24'>
                  Free Shipping Over Order $150
                </span>
                <h2 className='text-white fw-medium mb-0 max-w-375'>
                  Woman{" "}
                  <span className='fw-normal text-white font-heading-four '>
                    Spring
                  </span>{" "}
                  Collection
                </h2>
                <Link
                  to='/shop'
                  className='btn btn-outline-white d-inline-flex align-items-center rounded-pill gap-8 mt-48'
                  tabIndex={0}
                >
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
            <div
              className='promo-three-item bg-img rounded-16 overflow-hidden'
              data-background-image='assets/images/thumbs/promo-three-img-2.png'
              style={{
                backgroundImage: `url('assets/images/oceane/women.png')`,
              }}
            >
              <div className='text-start'>
                <span className='text-white mb-24'>Men Fashion Discover</span>
                <h2 className='text-white fw-medium mb-0 max-w-375'>
                  New{" "}
                  <span className='fw-normal text-white font-heading-four '>
                    Style
                  </span>{" "}
                  Sale 35% Off
                </h2>
                <Link
                  to='/shop'
                  className='btn btn-outline-white d-inline-flex align-items-center rounded-pill gap-8 mt-48'
                  tabIndex={0}
                >
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalThree;
