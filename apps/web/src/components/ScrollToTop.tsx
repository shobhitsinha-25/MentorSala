import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force browser window to snap right back to the top-left on route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}