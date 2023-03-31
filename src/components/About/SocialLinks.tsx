import React from 'react';
import './SocialLinks.css';

const SocialLinks: React.FC = () => {
  return (
    <div className="social-links">
      <a
        href="https://www.linkedin.com/in/elvisbrevi/"
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin" // Añadir la clase correspondiente
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/elvisbrevi"
        target="_blank"
        rel="noopener noreferrer"
        className="github" // Añadir la clase correspondiente
      >
        GitHub
      </a>
      <a
        href="https://twitter.com/elvisbrevi"
        target="_blank"
        rel="noopener noreferrer"
        className="twitter" // Añadir la clase correspondiente
      >
        Twitter
      </a>
    </div>
  );
};

export default SocialLinks;
