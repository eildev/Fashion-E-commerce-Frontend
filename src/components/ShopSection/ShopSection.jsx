import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetVariantApiQuery } from '../../redux/features/api/variantApi';
import { useGetCategoryQuery } from '../../redux/features/api/categoryApi';
import { useGetBrandQuery } from '../../redux/features/api/brandApi';
import { addCategoryWithName, addBrand, setFilteredSearchQuery, removeCategoryByName, removeBrand, clearAllFilters } from '../../redux/features/slice/filterSlice';
import toast from 'react-hot-toast';
import FilterSection from './FilterSection';
import ProductSection from './ProductSection';

const ShopSection = () => {
  const { data, isLoading } = useGetVariantApiQuery();
  const { data: categoryApi } = useGetCategoryQuery();
  const { data: brandData } = useGetBrandQuery();
  const dispatch = useDispatch();
  const location = useLocation();
console.log(data);
  // Calculate dynamic price range limits
  const prices = useMemo(
    () => data?.variant?.map(item => item?.regular_price).filter(price => price !== undefined && price !== null) || [],
    [data]
  );
  const minPrice = prices.length > 0 ? Math.min(...prices) - 100 : 10;
  const maxPrice = prices.length > 0 ? Math.max(...prices) + 100 : 10000;

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // UI states
  const [grid, setGrid] = useState(false);
  const [active, setActive] = useState(false);

  // Handle location state for category, brand, or search query
  useEffect(() => {
    const { category, brand, searchQuery } = location.state || {};
    
    if (category && categoryApi?.categories) {
      const categoryObj = categoryApi.categories.find(
        (cat) => cat.categoryName.toLowerCase() === category.toLowerCase()
      );
      if (categoryObj) {
        dispatch(addCategoryWithName({ id: categoryObj.id, name: categoryObj.categoryName }));
        setSelectedCategories((prev) => 
          prev.includes(categoryObj.id) ? prev : [...prev, categoryObj.id]
        );
      }
    }

    if (brand && brandData?.Brands) {
      const brandObj = brandData.Brands.find(
        (b) => b.BrandName.toLowerCase() === brand.toLowerCase()
      );
      if (brandObj) {
        dispatch(addBrand({ id: brandObj.id, name: brandObj.BrandName }));
        setSelectedBrands((prev) => 
          prev.includes(brandObj.id) ? prev : [...prev, brandObj.id]
        );
      }
    }

    if (searchQuery) {
      dispatch(setFilteredSearchQuery(searchQuery));
    }
  }, [location.state, categoryApi, brandData, dispatch]);

  // Sidebar toggle
  const sidebarController = () => {
    setActive(!active);
  };

  // Toggle category selection
  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Toggle brand selection
  const toggleBrand = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  // Remove filter (category, brand, price, or search)
  const removeFilter = (type, value) => {
    if (type === 'category') {
      setSelectedCategories((prev) => prev.filter((id) => id !== value));
      dispatch(removeCategoryByName(
        categoryApi?.categories?.find((c) => c.id === value)?.categoryName
      ));
    } else if (type === 'brand') {
      setSelectedBrands((prev) => prev.filter((id) => id !== value));
      dispatch(removeBrand(
        brandData?.Brands?.find((b) => b.id === value)?.BrandName
      ));
    } else if (type === 'price') {
      setPriceRange([minPrice, maxPrice]);
    } else if (type === 'search') {
      dispatch(setFilteredSearchQuery(''));
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([minPrice, maxPrice]);
    setCurrentPage(1);
    dispatch(clearAllFilters());
    toast.success('Filters reset');
  };

  // Filter products based on categories, brands, and price
  useEffect(() => {
    if (data?.variant) {
      let filtered = data.variant;

      // Apply category filter
      if (selectedCategories.length > 0) {
        filtered = filtered.filter((item) =>
          selectedCategories.includes(item.product?.category_id) ||
          selectedCategories.includes(item.product?.subcategory_id)
        );
      }

      // Apply brand filter
      if (selectedBrands.length > 0) {
        filtered = filtered.filter((item) =>
          selectedBrands.includes(item.product?.brand_id)
        );
      }

      // Apply price filter
      filtered = filtered.filter(
        (item) =>
          item.regular_price >= priceRange[0] &&
          item.regular_price <= priceRange[1]
      );

      setFilteredProducts(filtered);
      setCurrentPage(1); // Reset to first page when filters change
    }
  }, [data, selectedCategories, selectedBrands, priceRange]);

  // Paginate filtered products
  const paginatedData = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <section className="shop py-80">
      <div className={`side-overlay ${active && 'show'}`}></div>
      <div className="container container-lg">
        <div className="row">
          <FilterSection
            active={active}
            sidebarController={sidebarController}
            categoryApi={categoryApi}
            brandData={brandData}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            toggleCategory={toggleCategory}
            toggleBrand={toggleBrand}
            removeFilter={removeFilter}
            handleResetFilters={handleResetFilters}
            searchQuery={location.state?.searchQuery || ''}
          />
          <ProductSection
            isLoading={isLoading}
            paginatedData={paginatedData}
            filteredProducts={filteredProducts}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalPages={totalPages}
            grid={grid}
            setGrid={setGrid}
            sidebarController={sidebarController}
          />
        </div>
      </div>
    </section>
  );
};

export default ShopSection;