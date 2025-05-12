import React from "react";
import Preloader from "../helper/Preloader";
import HeaderTwo from "../components/HeaderTwo";
import BannerThree from "../components/BannerThree";
import PromotionalThree from "../components/PromotionalThree";
import DealsOne from "../components/DealsOne";
import TopSellingOne from "../components/TopSellingOne";
import TrendingOne from "../components/TrendingOne";
import DiscountOne from "../components/DiscountOne";
import FeaturedOne from "../components/FeaturedOne";
import BigDealOne from "../components/BigDealOne";
import TopSellingTwo from "../components/TopSellingTwo";
import PopularProductsOne from "../components/PopularProductsOne";
import TopVendorsTwo from "../components/TopVendorsTwo";
import DaySaleOne from "../components/DaySaleOne";
import RecentlyViewedOne from "../components/RecentlyViewedOne";
import BrandTwo from "../components/BrandTwo";
import ShippingTwo from "../components/ShippingTwo";
import NewsletterTwo from "../components/NewsletterTwo";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import HeaderThree from "../components/HeaderThree";
import { useGetVariantApiQuery } from "../redux/features/api/variantApi";
import { useGetBrandQuery } from "../redux/features/api/brandApi";

const HomePageThree = () => {
  const { data: variantData, isLoading } = useGetVariantApiQuery();
  const { data: brandData, isLoadingBrand } = useGetBrandQuery();

  return (

    <>
      {/* ColorInit */}
      {/* <ColorInit color={true} /> */}

      {/* ScrollToTop */}
      {/* <ScrollToTop smooth color="#FA6400" /> */}

      {/* Preloader */}
      {/* <Preloader /> */}

      {/* HeaderTwo */}
      {/* <HeaderThree category={true} /> */}

      {/* BannerTwo */}
  <BannerThree></BannerThree>
      {/* PromotionalTwo */}
      <PromotionalThree data={variantData}/>

      {/* DealsOne */}
      <DealsOne data={variantData}/>

      {/* TopSellingOne */}
      <TopSellingTwo data={variantData}/>

      {/* TrendingOne */}
      <TrendingOne data={variantData}/>

      {/* DiscountOne */}
      <DiscountOne />

      {/* FeaturedOne */}
      <FeaturedOne data={variantData}/>

      {/* BigDealOne */}
      <BigDealOne />

      {/* TopSellingTwo */}
      <TopSellingTwo data={variantData}/>

      {/* PopularProductsOne */}
      <PopularProductsOne data={variantData}/>

      {/* TopVendorsTwo */}
      <TopVendorsTwo data={variantData}/>

      {/* DaySaleOne */}
      <DaySaleOne />

      {/* RecentlyViewedOne */}
      <RecentlyViewedOne data={variantData}/>

      {/* BrandTwo */}
      <BrandTwo data={brandData}/>

      {/* ShippingTwo */}
      {/* <ShippingTwo /> */}

      {/* NewsletterTwo */}
      {/* <NewsletterTwo /> */}

      {/* FooterTwo */}
      {/* <FooterTwo /> */}

      {/* BottomFooter */}
      {/* <BottomFooter /> */}


    </>
  );
};

export default HomePageThree;
