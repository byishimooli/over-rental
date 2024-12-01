import React from 'react';
import Navbar from './NavBar';
import HeroSection from './HeroSection';
import PromotedAds from './Promotead';
import RealEstateTypes from './RealEstate';
import FooterForm from './Footer';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <PromotedAds />
      <RealEstateTypes />
      <FooterForm />
    </div>
  );
};

export default LandingPage;
