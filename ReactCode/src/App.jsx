import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './Index.css'

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ScrollToTop from "./components/ScrollToTop";
import HelpSupport from "./pages/HelpSupport";
import Contacts from "./pages/Contacts";
import AboutUs from "./pages/AboutUs";

import CineDrones from "./pages/CineDrones";
import FPVDrones from "./pages/FPVDrones";
import FpvProductDetail from "./pages/FPVProductDetails";
import CineProductDetail from "./pages/CineProductDetail";
import Accessories from "./pages/Accessories";
import AccessoryDetail from "./pages/AccessoriesDetails";
import EnterpriseDrones from "./pages/EnterpriseDrones";
import EnterpriseProductDetail from "./pages/EnterpriseProductDetail";


function App() {
  return (
    <>
    <BrowserRouter>
      <ScrollToTop/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/help&support" element={<HelpSupport/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/aboutus" element={<AboutUs/>} />

        <Route path="/products/cine" element={<CineDrones />} />
        <Route path="/products/fpv" element={<FPVDrones />} />
        <Route path="/products/accessories" element={<Accessories />} />
        <Route path="/products/epdrones" element={<EnterpriseDrones />} />

        <Route path="/products/cine/:slug" element={<CineProductDetail />} />
        <Route path="/products/fpv/:slug" element={<FpvProductDetail />} />
        <Route path="/products/accessories/:slug" element={<AccessoryDetail />} />
        <Route path="/products/epdrones/:slug" element={<EnterpriseProductDetail />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
