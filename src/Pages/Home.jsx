import React from 'react';
import Navbar from '../Componants/Navbar';
import HeroSection from '../Componants/HeroSection';
import ChooseUs from '../Componants/ChooseUs';
import Reviews from '../Componants/reviews';
import TopDecorators from '../Componants/TopDecorators';
import AboutDecoraNest from '../Componants/AboutDecoraNest';
import TopServices from '../Componants/TopServices';
import Coverage from '../Componants/Coverage';

const Home = () => {
    return (
        <div>
        <HeroSection></HeroSection>
        <ChooseUs></ChooseUs>
        <TopDecorators></TopDecorators>
        <TopServices></TopServices>
        <AboutDecoraNest></AboutDecoraNest>
        <Reviews></Reviews>
        <Coverage></Coverage>
        </div>
    );
};

export default Home;