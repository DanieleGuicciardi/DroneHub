import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Index.css'

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

//pages
import Homepage from "./pages/home/Home"

import Login from "./pages/auth/Login";

import Cart from "./pages/cart/Cart"
import Checkout from "./pages/cart/Checkout";
import OrderInfo from "./pages/cart/OrderInfo";

import AboutUs from "./pages/info/AboutUs";
import Contacts from "./pages/info/Contacts";
import HelpSupport from "./pages/info/HelpSupport";

import Products from "./pages/products/Products";
import CineDrones from "./pages/products/CineDrones";
import FPVDrones from "./pages/products/FPVDrones";
import FpvProductDetail from "./pages/products/FPVProductDetails";
import CineProductDetail from "./pages/products/CineProductDetail";
import Accessories from "./pages/products/Accessories";
import AccessoryDetail from "./pages/products/AccessoriesDetails";
import EnterpriseDrones from "./pages/products/EnterpriseDrones";
import FpvCustomRequest from "./pages/products/FPVCustomRequest";


function App() {
  return (
    <>
    <BrowserRouter>
      <ScrollToTop/>
      <div className="pt-5 bg-black black">
        <Navbar/>
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        
        <Route path="/login" element={<Login/>} />

        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/orderinfo" element={<OrderInfo/>} />

        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/help&support" element={<HelpSupport/>} />

        <Route path="/products" element={<Products/>} />
        <Route path="/products/cine" element={<CineDrones />} />
        <Route path="/products/fpv" element={<FPVDrones />} />
        <Route path="/products/accessories" element={<Accessories />} />
        <Route path="/products/epdrones" element={<EnterpriseDrones />} />
        <Route path="/products/cine/:slug" element={<CineProductDetail />} />
        <Route path="/products/fpv/:slug" element={<FpvProductDetail />} />
        <Route path="/products/accessories/:slug" element={<AccessoryDetail />} />
        <Route path="/products/customrequest" element={<FpvCustomRequest/>} />

      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
