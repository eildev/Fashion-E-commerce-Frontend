import React from "react";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
import ShippingOne from "../components/ShippingOne";
import BlogDetails from "../components/blogs/BlogDetails";
import ScrollToTop from "react-scroll-to-top";
const BlogDetailsPage = () => {
  return (
    <>
      {/* ColorInit */}


      {/* BlogDetails */}
      <BlogDetails />

      {/* ShippingOne */}
      <ShippingOne />

  
    </>
  );
};

export default BlogDetailsPage;
