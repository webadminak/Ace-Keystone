import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Projects } from "./components/projects";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";

import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const backgroundImages = ["../img/img1.jpg", "../img/img2.jpg"]; // Add additional image URLs here

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1)); // Change index every 5 seconds
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div>
      {/* <button className="toggle-btn" onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button> */}
      <Navigation />
      <div className={`intro ${isDarkMode ? 'dark-mode' : ''}`} style={{ backgroundImage: `url(${backgroundImages[backgroundIndex]})` }} />
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Features data={landingPageData.Features} />
      <Projects data={landingPageData.Projects} /> 
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default App;
