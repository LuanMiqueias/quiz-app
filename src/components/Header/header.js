import React from "react";
import logo from "../../assets/icons/logo.svg";
import { Link } from "react-router-dom";

import "./style.css";
function Header({ children, ...props }) {
  const [pageTop, setPageTop] = React.useState();

  const handleOnScroll = React.useCallback(() => {
    if (window.innerWidth > 512) {
      return;
    }
    if (window.pageYOffset > 50 && window.innerWidth < 512) {
      setPageTop("menu-moblie-onscroll");
    } else if (window.pageYOffset === 0) {
      setPageTop("menu-moblie-onscroll-close");
      setTimeout(() => {
        setPageTop("");
      }, 300);
    }
  });
  React.useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    return () => window.removeEventListener("scroll", handleOnScroll);
  }, [handleOnScroll]);
  return (
    <header className={pageTop} {...props}>
      <div className="content">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" title="logo" height="40px" />
        </Link>
        {children}
      </div>
    </header>
  );
}

export default Header;
