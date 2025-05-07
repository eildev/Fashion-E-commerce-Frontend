// src/components/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import Preloader from "../helper/Preloader";
import HeaderThree from "../components/HeaderThree";
import Breadcrumb from "../components/Breadcrumb";
import ShippingOne from "../components/ShippingOne";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";

const MainLayout = ({ title, showBreadcrumb = true, showShipping = true }) => {
  return (
    <>
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#FA6400" />

      {/* Preloader */}
      <Preloader />

      {/* HeaderThree */}
      <HeaderThree category={true} />

    

      {/* Render child routes */}
      <Outlet />

      {/* ShippingOne */}
      {showShipping && <ShippingOne />}

      {/* FooterTwo */}
      <FooterTwo />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default MainLayout;