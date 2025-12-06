import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-semibold ${isActive ? "text-primary" : ""}`
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `font-semibold ${isActive ? "text-primary" : ""}`
          }
        >
          Services
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `font-semibold ${isActive ? "text-primary" : ""}`
          }
        >
          About
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `font-semibold ${isActive ? "text-primary" : ""}`
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar max-w-7xl mx-auto">

        {/* Left Section */}
        <div className="navbar-start">

          {/* Mobile Menu Button */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>

            {/* Mobile Menu Content */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52 z-50"
            >
              {navLinks}
            </ul>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/assets/logo.png" className="w-16 h-16" alt="logo" />
            <span className="text-2xl font-bold">DecoraNest</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6">{navLinks}</ul>
        </div>

        {/* Right Section */}
        <div className="navbar-end">
          <button className="rainbow-hover mr-4">
            <span className="sp">Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
