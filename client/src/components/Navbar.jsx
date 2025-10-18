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
  console.log(location);

  const NavBarDesign = () => {
    location === "/" || location === "/login" || location === "/register"
      ? setNavBg(false)
      : setNavBg(true);
  };

  const handleClick = () => {
    isAdmin ? navigate("/adminpanel") : navigate("/dashboard");
  };

  useEffect(() => {
    NavBarDesign();
  }, [location]);

  return (
    <>
      <div
        className={`${
          navBg ? "bg-white" : "bg-transparent"
        } flex justify-center gap-10  text-xl items-center sticky top-0 z-99`}
      >
        <Link to={"/about"}>About</Link>
        <Link to={"/services"}>Our Services</Link>
        <Link to={"/stories"}>Client Stories</Link>
        <Link to={"/"}>
          <img src={logo} alt="" className="h-[5em]" />
        </Link>
        <Link to={"/gallery"}>Gallery</Link>
        <Link to={"/contact"}>Contact Us</Link>
        {isLogin ? (
          <div
            className="flex gap-3 items-center cursor-pointer"
            onClick={handleClick}
          >
            <img
              src={user.photo}
              alt="User Dp"
              className="h-10 w-10 border rounded-full object-cover"
            />
            <span className="text-pink-500">{user.fullName}</span>
          </div>
        ) : (
          <button
            className="border p-3 rounded-md"
            onClick={() => navigate("login")}
          >
            {" "}
            Login to Plan your event{" "}
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
