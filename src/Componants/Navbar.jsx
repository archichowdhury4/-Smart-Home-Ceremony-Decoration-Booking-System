import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>

                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-3">
                    <NavLink to="/"><a className='font-bold text-lg'>Home</a></NavLink>
                    <NavLink to=""><a className='font-bold text-lg'>Services</a></NavLink>
                    <NavLink to=""><a className='font-bold text-lg'>About</a></NavLink>
                    <NavLink to=""><a className='font-bold text-lg'>Contact</a></NavLink>
                    </ul>
                </div>

                <div className='flex items-center gap-2 ml-8'>
                    <img src="/assets/logo.png" alt="DecoraNest Logo" className="w-20 h-20" />
                    <a className="btn btn-ghost text-xl font-semibold">DecoraNest</a>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-3">
                    <NavLink to="/"><a className='font-bold text-lg'>Home</a></NavLink>
                    <NavLink to=""><a className='font-bold text-lg'>Services</a></NavLink>
                    <NavLink to=""><a className='font-bold text-lg'>About</a></NavLink>
                    <NavLink to=""><a className='font-bold text-lg'>Contact</a></NavLink>
                </ul>
            </div>

            <div className="navbar-end">
                <button  className="rainbow-hover mr-8">
                <span className="sp">Login</span>
                </button>
            </div>
        </div>
    );
};

export default Navbar;
