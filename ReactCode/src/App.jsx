import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './Index.css'

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";

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
        {/*  */}
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
