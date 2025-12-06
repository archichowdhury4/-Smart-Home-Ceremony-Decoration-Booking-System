import React from 'react';
import Navbar from '../Componants/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Componants/Footer';

const AuthLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        
        </div>
    );
};

export default AuthLayout;