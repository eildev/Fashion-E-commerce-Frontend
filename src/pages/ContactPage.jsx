import React from "react";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
import ShippingOne from "../components/ShippingOne";
import Contact from "../components/Contact";
import ScrollToTop from "react-scroll-to-top";
const ContactPage = () => {
  return (
    <>


      {/* Contact */}
      <Contact />

      {/* ShippingOne */}
      <ShippingOne />

      FooterTwo
      <FooterTwo />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default ContactPage;
