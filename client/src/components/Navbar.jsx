import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, isLogin, isAdmin } = useAuth();
  const [navBg, setNavBg] = useState(false);

  const location = useLocation().pathname;

  const NavBarDesign = () => {
    const transparentPaths = ["/", "/login", "/register"];
    setNavBg(!transparentPaths.includes(location));
  };

  const handleClick = () => {
    isAdmin ? navigate("/adminpanel") : navigate("/dashboard");
  };

  useEffect(() => {
    NavBarDesign();
  }, [location]);

  // Color helpers: when navBg is false (transparent), text should be light (white)
  const baseLink = navBg ? "text-gray-700 hover:text-pink-600" : "text-white hover:text-pink-200";
  const activeLink = navBg ? "text-pink-600 font-medium" : "text-pink-200 font-medium";
  const loginBtnClass = navBg
    ? "hidden md:inline-block px-4 py-2 rounded-md bg-pink-500 text-white font-medium hover:bg-pink-600"
    : "hidden md:inline-block px-4 py-2 rounded-md border border-white/40 text-white hover:bg-white/10";

  return (
    <div
      className={`${navBg ? "bg-white shadow-sm" : "bg-transparent"} sticky top-0 z-50`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="block shrink-0">
              <img src={logo} alt="logo" className="h-12 w-auto" />
            </Link>

            <div className="hidden md:flex md:items-center md:space-x-6 text-lg">
              <Link
                to="/about"
                className={`${baseLink} ${location === "/about" ? activeLink : ""}`}
              >
                About
              </Link>
              <Link
                to="/services"
                className={`${baseLink} ${location === "/services" ? activeLink : ""}`}
              >
                Our Services
              </Link>
              <Link
                to="/stories"
                className={`${baseLink} ${location === "/stories" ? activeLink : ""}`}
              >
                Client Stories
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex md:items-center md:space-x-6 text-lg">
              <Link to="/gallery" className={`${baseLink} ${location === "/gallery" ? activeLink : ""}`}>
                Gallery
              </Link>
              <Link to="/contact" className={`${baseLink} ${location === "/contact" ? activeLink : ""}`}>
                Contact Us
              </Link>
            </div>

            {isLogin ? (
              <div
                className="flex gap-3 items-center cursor-pointer"
                onClick={handleClick}
                role="button"
                tabIndex={0}
              >
                <img
                  src={user?.photo || "https://placehold.co/40x40?text=U"}
                  alt={user?.fullName || "User"}
                  className="h-10 w-10 border rounded-full object-cover"
                />
                <span className={`${navBg ? "text-pink-500" : "text-white"} hidden sm:inline`}>{user?.fullName?.split(" ")[0] || "Account"}</span>
              </div>
            ) : (
              <button className={loginBtnClass} onClick={() => navigate("/login")}>Login to Plan your event</button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
