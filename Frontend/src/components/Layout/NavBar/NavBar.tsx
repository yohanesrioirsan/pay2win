import { useState } from "react";
import navBrand from "../../../assets/img/p2w.png";
import "../../../Styles/NavBar.css";
import auth from "../../../utility/auth";

function NavBar() {
  const [isMobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileOpen(!isMobileOpen);
  };

  const isLoggedIn = () => {
    return auth.getAuth() !== null;
  };

  const handleLogout = () => {
    auth.logout();
  };

  console.log("Rendering NavBar. isLoggedIn:", isLoggedIn());

  return (
    <>
      <nav>
        <div className="nav-brand">
          <img src={navBrand} alt="nav-brand" />
        </div>
        <div className={`nav-links ${isMobileOpen ? "active" : ""}`}>
          <ul>
            {isLoggedIn() ? (
              <>
                <li>
                  <a href="/dashboard">Home</a>
                </li>
                <li>
                  <a href="/" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/">Services</a>
                </li>
                <li>
                  <a href="/">Products</a>
                </li>
                <li>
                  <a href="/">About Us</a>
                </li>
                <div className="contact-wrapper">
                  <li>
                    <a href="/signin">Sign In</a>
                  </li>
                </div>
              </>
            )}
          </ul>
        </div>
        <div className="burger-menu" onClick={toggleMobileMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
