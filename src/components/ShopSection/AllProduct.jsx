import { useEffect } from "react";
import Product from "../../components/product_card/Product";
import { useGetProductsQuery } from "../../redux/features/api/product-api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredProducts } from "../../redux/features/slice/filterSlice";


const AllProduct = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetProductsQuery();
  const {
    filteredCategories,
    filteredTags,
    filteredPrices,
    filteredBrands,
    filteredFeatures,
    filteredSearchQuery,
    filteredProducts,
    sortOption,
  } = useSelector((state) => state.filters);

  const isAnyFilterApplied =
    filteredCategories.length > 0 ||
    filteredTags.length > 0 ||
    filteredPrices.length > 0 ||
    filteredBrands.length > 0 ||
    filteredFeatures.length > 0 ||
    filteredSearchQuery !== "";

  useEffect(() => {
    if (data?.data) {
      dispatch(setFilteredProducts(data.data));
    }
  }, [
    data,
    dispatch,
    filteredCategories,
    filteredTags,
    filteredPrices,
    filteredBrands,
    filteredFeatures,
    filteredSearchQuery,
    sortOption,
  ]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5 my-3 px-5 w-full">
        {Array.from({ length: 9 }).map((_, index) => (
        //   <ProductSkeleton key={index} />
        <h1>loading......</h1>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center my-5">
        Error: {error.message || "Failed to load products"}
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5 my-3 px-5 w-full">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div
            key={product.id}
            className="transition-all duration-500 ease-in-out animate-fadeIn"
          >
            <Product product={product} />
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 my-10">
          {isAnyFilterApplied
            ? "No products matched your filters"
            : "No products found"}
        </div>
      )}
    </div>
  );
};

export default AllProduct;
