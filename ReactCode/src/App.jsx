import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './Index.css'

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import ScrollToTop from "./components/ScrollToTop";
import CineDrones from "./pages/CineDrones";
import FPVDrones from "./pages/FPVDrones";
import FpvProductDetail from "./pages/FPVProductDetails";
import CineProductDetail from "./pages/CineProductDetail";

function App() {
  return (
    <>
    <BrowserRouter>
      <ScrollToTop/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products/>} />
        {/*<Route path="/login" element={<Login/>} /> */}
        
        <Route path="/products/cine" element={<CineDrones />} />
        <Route path="/products/fpv" element={<FPVDrones />} />

        <Route path="/products/cine/:slug" element={<CineProductDetail />} />
        <Route path="/products/fpv/:slug" element={<FpvProductDetail />} />
        
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
