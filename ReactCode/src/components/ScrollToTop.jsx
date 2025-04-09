import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//this code reset to the top the scroll page every time

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
