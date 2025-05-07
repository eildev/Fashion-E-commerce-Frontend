// src/App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import MainLayout from "./components/MainLayout"; // Import the layout
import HomePageThree from "./pages/HomePageThree";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPageOne from "./pages/ProductDetailsPageOne";
import ProductDetailsPageTwo from "./pages/ProductDetailsPageTwo";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import ContactPage from "./pages/ContactPage";
import VendorPage from "./pages/VendorPage";
import VendorDetailsPage from "./pages/VendorDetailsPage";
import VendorTwoPage from "./pages/VendorTwoPage";
import VendorTwoDetailsPage from "./pages/VendorTwoDetailsPage";
import BecomeSellerPage from "./pages/BecomeSellerPage";
import WishlistPage from "./pages/WishlistPage";
import UserDetails from "./pages/UserDetailsPage";
import UserDashboard from "./components/userDashboard/UserDashboard";
import UserTabs from "./components/userDashboard/UserTabs";
import ComparePage from "./pages/ComparePage";

function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <PhosphorIconInit />

      <Routes>
        {/* HomePageThree with its own structure */}
        <Route exact path="/" element={<HomePageThree />} />

        {/* Routes using MainLayout */}
        <Route element={<MainLayout />}>
          <Route exact path="/shop" element={<ShopPage />} />
          <Route exact path="/product-details" element={<ProductDetailsPageOne />} />
          <Route exact path="/product-details-two/:id" element={<ProductDetailsPageTwo />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route exact path="/become-seller" element={<BecomeSellerPage />} title="Become a Seller" />
          <Route exact path="/wishlist" element={<WishlistPage />} title="My Wishlist" />
          <Route exact path="/account" element={<AccountPage />} title="Account" />
          <Route exact path="/blog" element={<BlogPage />} title="Blog" />
          <Route exact path="/blog-details/:id" element={<BlogDetailsPage />} title="Blog Details" />
          <Route exact path="/contact" element={<ContactPage />} title="Contact" />
          <Route exact path="/vendor" element={<VendorPage />} title="Vendor" />
          <Route exact path="/vendor-details" element={<VendorDetailsPage />} title="Vendor Details" />
          <Route exact path="/user-details" element={<UserDetails />} title="User Details" showBreadcrumb={false} />
          <Route exact path="/vendor-two" element={<VendorTwoPage />} title="Vendor Two" />
          <Route exact path="/compare" element={<ComparePage />} title="Compare" />
          <Route exact path="/vendor-two-details" element={<VendorTwoDetailsPage />} title="Vendor Two Details" />
        </Route>

        {/* Routes without MainLayout */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-tabs/:tabId" element={<UserTabs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;