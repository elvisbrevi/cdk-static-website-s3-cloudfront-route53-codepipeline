import React from 'react';
import SocialLinks from '../components/About/SocialLinks';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">Elvis Brevi</h1>
      <SocialLinks />
    </div>
  );
};

export default AboutPage;
