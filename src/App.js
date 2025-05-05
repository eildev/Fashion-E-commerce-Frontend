import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import HomePageOne from "./pages/HomePageOne";

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
import PhosphorIconInit from "./helper/PhosphorIconInit";
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
import ProtectedCartRoute from "./Route/ProtectedCartRoute";
function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <PhosphorIconInit />

      <Routes>
        {/* <Route exact path='/' element={<HomePageOne />} /> */}
        {/* <Route exact path='/index-two' element={<HomePageTwo />} /> */}
        <Route exact path='/' element={<HomePageThree />} />
        <Route exact path='/shop' element={<ShopPage />} />
        <Route
          exact
          path='/product-details'
          element={<ProductDetailsPageOne />}
        />
        <Route
          exact
          path='/product-details-two/:id'
          element={<ProductDetailsPageTwo />}
        />
        <Route exact path='/cart' element={<ProtectedCartRoute><CartPage /></ProtectedCartRoute>} />
        <Route exact path='/checkout' element={<ProtectedCartRoute><CheckoutPage /></ProtectedCartRoute>} />
        <Route exact path='/become-seller' element={<BecomeSellerPage />} />
        <Route exact path='/wishlist' element={<WishlistPage />} />
        <Route exact path='/account' element={<AccountPage />} />
        <Route exact path='/blog' element={<BlogPage />} />
        <Route exact path='/blog-details/:id' element={<BlogDetailsPage />} />
        <Route exact path='/contact' element={<ContactPage />} />
        <Route exact path='/vendor' element={<VendorPage />} />
        <Route exact path='/vendor-details' element={<VendorDetailsPage />} />
        <Route exact path='/user-details' element={<UserDetails />} />
        <Route exact path='/vendor-two' element={<VendorTwoPage />} />
        <Route exact path='/compare' element={<ComparePage />} />
        <Route
          exact
          path='/vendor-two-details'
          element={<VendorTwoDetailsPage />}
        />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-tabs/:tabId" element={<UserTabs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
