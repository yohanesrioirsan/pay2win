import { useNavigate } from "react-router-dom";
import { useState } from "react";
import navBrand from "../../../assets/img/p2w.png";
import "../../../Styles/NavBar.css";
import auth from "../../../utility/auth";

function NavBar() {
  const navigate = useNavigate();
  const [isMobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileOpen(!isMobileOpen);
  };

  const isLoggedIn = () => {
    return auth.getAuth() !== null;
  };

  const handleLogout = () => {
    auth.logout();

    navigate("/");
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
                  <a onClick={() => navigate("/dashboard")}>Home</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a onClick={() => navigate("/")}>Home</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Products</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <div className="contact-wrapper">
                  <li>
                    <a onClick={() => navigate("/signin")}>Sign In</a>
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
