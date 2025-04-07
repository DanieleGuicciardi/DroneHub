import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './Index.css'

import Navbar from "./components/Navbar";
/* importare le pagine prodotti e login */

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
       {/*  <Route path="/prodotti" element={<Prodotti/>} />
        <Route path="/login" element={<Login/>} /> */}
        {/*  */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
