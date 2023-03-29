import React, { useState, useEffect, useRef } from "react";
  
const About = () => {
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

    const getEyeTransform = (x: number, y: number) => {
        const dx = x - 50;
        const dy = y - 50;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 2.5);
        const tx = distance * Math.cos(angle);
        const ty = distance * Math.sin(angle);
        return `translate(${tx},${ty})`;
    };     

    const svgRef = useRef<SVGSVGElement>(null);

    const handleWindowMouseMove = (e: MouseEvent) => {
        if (!svgRef.current) return;
        const { left, top, width, height } = svgRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setEyePosition({ x, y });
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleWindowMouseMove);
        return () => {
        window.removeEventListener("mousemove", handleWindowMouseMove);
        };
    }, []);
      

    return (
      <div className="flex">
        <div className="w-1/2">
        <svg ref={svgRef} className="w-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="none" stroke="black" strokeWidth="2" />
              <circle
                  className="eye"
                  cx="35"
                  cy="40"
                  r="5"
                  fill="black"
                  transform={getEyeTransform(eyePosition.x, eyePosition.y)}
              />
              <circle
                  className="eye"
                  cx="65"
                  cy="40"
                  r="5"
                  fill="black"
                  transform={getEyeTransform(eyePosition.x, eyePosition.y)}
              />
          </svg>
          <p className="text-center">
            Soy un apasionado programador full stack con más de una década de
            experiencia en el mundo de la tecnología y el desarrollo de software.
          </p>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center gap-4">
          <a
            className="btn bg-primary text-white p-2 rounded"
            href="https://www.linkedin.com/in/elvisbrevi/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="btn bg-primary text-white p-2 rounded"
            href="https://github.com/elvisbrevi"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="btn bg-primary text-white p-2 rounded"
            href="https://twitter.com/elvisbrevi"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
          <a
            className="btn bg-primary text-white p-2 rounded"
            href="resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </div>
      </div>
    );
};

export default About;

