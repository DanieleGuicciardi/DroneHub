import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Index.css'

import Homepage from "./pages/home/Home"

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/auth/Login";
import Products from "./pages/products/Products";
import ScrollToTop from "./components/ScrollToTop";
import HelpSupport from "./pages/info/HelpSupport";
import Contacts from "./pages/info/Contacts";
import AboutUs from "./pages/info/AboutUs";
import Cart from "./pages/cart/Cart"

import CineDrones from "./pages/products/CineDrones";
import FPVDrones from "./pages/products/FPVDrones";
import FpvProductDetail from "./pages/products/FPVProductDetails";
import CineProductDetail from "./pages/products/CineProductDetail";
import Accessories from "./pages/products/Accessories";
import AccessoryDetail from "./pages/products/AccessoriesDetails";
import EnterpriseDrones from "./pages/products/EnterpriseDrones";


function App() {
  return (
    <>
    <BrowserRouter>
      <ScrollToTop/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/help&support" element={<HelpSupport/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/cart" element={<Cart/>} />

        <Route path="/products/cine" element={<CineDrones />} />
        <Route path="/products/fpv" element={<FPVDrones />} />
        <Route path="/products/accessories" element={<Accessories />} />
        <Route path="/products/epdrones" element={<EnterpriseDrones />} />

        <Route path="/products/cine/:slug" element={<CineProductDetail />} />
        <Route path="/products/fpv/:slug" element={<FpvProductDetail />} />
        <Route path="/products/accessories/:slug" element={<AccessoryDetail />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
