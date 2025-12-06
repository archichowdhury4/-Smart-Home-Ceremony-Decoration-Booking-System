import React from 'react';
import Navbar from '../Componants/Navbar';
import HeroSection from '../Componants/HeroSection';
import ChooseUs from '../Componants/ChooseUs';
import Reviews from '../Componants/reviews';
import TopDecorators from '../Componants/TopDecorators';
import AboutDecoraNest from '../Componants/AboutDecoraNest';

const Home = () => {
    return (
        <div>
        <HeroSection></HeroSection>
        <ChooseUs></ChooseUs>
        <TopDecorators></TopDecorators>
        <AboutDecoraNest></AboutDecoraNest>
        <Reviews></Reviews>
        </div>
    );
};

export default Home;