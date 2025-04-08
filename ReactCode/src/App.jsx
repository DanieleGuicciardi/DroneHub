import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './Index.css'

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./pages/Products";

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products/>} />
        {/*<Route path="/login" element={<Login/>} /> */}
        {/*  */}
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
