import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <li><NavLink to="/" className={({ isActive }) => `font-semibold ${isActive ? "text-primary" : ""}`}>Home</NavLink></li>
      <li><NavLink to="/services" className={({ isActive }) => `font-semibold ${isActive ? "text-primary" : ""}`}>Services</NavLink></li>
      <li><NavLink to="/about" className={({ isActive }) => `font-semibold ${isActive ? "text-primary" : ""}`}>About</NavLink></li>
       {
            user && <>
                <li><NavLink to="/dashboard/my-services"  className={({ isActive }) => `font-semibold ${isActive ? "text-primary" : ""}`}>My Parcels</NavLink></li>
            </>
        }
      <li><NavLink to="/contact" className={({ isActive }) => `font-semibold ${isActive ? "text-primary" : ""}`}>Contact</NavLink></li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 lg:px-0">

        {/* Left Section */}
        <div className="navbar-start">
          {/* Mobile Menu Button */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>

            <ul tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {navLinks}

              {user ? (
                <li><button onClick={handleSignOut}>LogOut</button></li>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/assets/logo.png" className="w-12 h-12 lg:w-16 lg:h-16" alt="logo" />
            <span className="text-xl lg:text-2xl font-bold">DecoraNest</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6">{navLinks}</ul>
        </div>

        {/* Right Section — Desktop Only */}
        <div className="navbar-end hidden lg:flex items-center gap-2">
          {user ? (
            <button onClick={handleSignOut} className="rainbow-hover px-4 py-2 rounded">
              LogOut
            </button>
          ) : (
            <>
              <Link to="/login" className="rainbow-hover px-4 py-2 rounded">Login</Link>
              <Link to="/register" className="rainbow-hover px-4 py-2 rounded">Register</Link>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
