import React from 'react';
import { Tooltip,  } from 'react-tooltip'
import './SocialLinks.css';
import "react-tooltip/dist/react-tooltip.css";

const SocialLinks: React.FC = () => {
  return (
    <div className="social-links">
      <Tooltip
        content="Professional stuff"
        place="bottom"
        anchorId="link-linkedin" />
      <a
        id="link-linkedin"
        href="https://www.linkedin.com/in/elvisbrevi/"
        target="_blank"
        className="linkedin" 
      >
        LinkedIn
      </a>
      <Tooltip
        content="Code"
        place="bottom"
        anchorId="link-github" />
      <a
        id="link-github"
        href="https://github.com/elvisbrevi"
        target="_blank"
        className="github" 
      >
        GitHub
      </a>
      <Tooltip
        content="Personal stuff"
        place="bottom"
        anchorId="link-twitter" />
      <a
        id="link-twitter"
        href="https://twitter.com/elvisbrevi"
        target="_blank"
        className="twitter" 
      >
        Twitter
      </a>
    </div>
  );
};

export default SocialLinks;
