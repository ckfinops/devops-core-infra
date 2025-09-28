import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Persist last visited path so we can redirect users back after login.
    // Avoid storing the login page itself as the last path.
    try {
      if (pathname && pathname !== '/login') {
        localStorage.setItem('lastPath', pathname);
      }
    } catch (e) {
      // ignore storage errors
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;