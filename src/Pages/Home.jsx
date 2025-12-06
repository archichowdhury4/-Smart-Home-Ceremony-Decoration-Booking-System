import React from 'react';
import Navbar from '../Componants/Navbar';
import HeroSection from '../Componants/HeroSection';
import ChooseUs from '../Componants/ChooseUs';
import Reviews from '../Componants/reviews';

const Home = () => {
    return (
        <div>
        <HeroSection></HeroSection>
        <ChooseUs></ChooseUs>
        <Reviews></Reviews>
        </div>
    );
};

export default Home;