// src/pages/ProductDetailsPageTwo.jsx
import React from "react";
import { useParams } from "react-router-dom";
import ProductDetailsTwo from "../components/ProductDetailsTwo";
import NewArrivalTwo from "../components/NewArrivalTwo";
import NewsletterOne from "../components/NewsletterOne";
import { useGetVariantApiQuery } from "../redux/features/api/variantApi";

const ProductDetailsPageTwo = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetVariantApiQuery();
  const item = data?.variant?.find((variant) => String(variant.id) === id);

  return (
    <>
      {/* ProductDetailsTwo */}
      <ProductDetailsTwo item={item} />

      {/* NewArrivalTwo */}
      <NewArrivalTwo />

      {/* NewsletterOne */}
      <NewsletterOne />
    </>
  );
};

export default ProductDetailsPageTwo;