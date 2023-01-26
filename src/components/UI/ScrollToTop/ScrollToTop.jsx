import { useEffect } from "react";
import { useLocation } from "react-router";

// As the name implies, for new page redirect to scroll to top
const ScrollToTop = (props) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

  }, [location]);

  return <>{props.children}</>
};

export default ScrollToTop;