import React, { useState, useEffect } from "react";
import logo from "../data/logo.jpg.png"; 

export const Navigation = (props) => {
  const [scrolling, setScrolling] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("url(../img/img1.jpg)"); // Default background image

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Change the background image every 3 seconds
      const randomImageNumber = Math.floor(Math.random() * 5) + 1; // Assuming you have 5 images named img1.jpg, img2.jpg, ..., img5.jpg
      setBackgroundImage(`url(../img/img${randomImageNumber}.jpg)`);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav id="menu" className={`navbar navbar-default navbar-fixed-top ${scrolling ? 'navbar-scrolled' : ''}`} style={{ backgroundColor: scrolling ? 'white' : 'transparent', transition: 'background-color 0.5s' }}>
      <div className="container">
        <div className="navbar-header">
          <div style={{ display: 'flex', alignItems: 'center', transition: 'margin 0.5s' }}>
            <img src={logo} alt="logo" width="90" height="64" style={{ marginRight: '10px', transition: 'transform 0.5s' }} />
            <a className="navbar-brand page-scroll" href="#page-top" style={{ fontWeight: 'bold', fontFamily: 'SegoeUI, Tahoma, Geneva, Verdana, sans-serif', color: scrolling ? 'black' : 'white', transition: 'color 0.5s' }}>
              Adept Knowledge Technologies
            </a>
          </div>
          
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            style={{ transition: 'opacity 0.5s' }}
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#about" className="page-scroll" style={{ fontWeight: 'bold', color: scrolling ? 'red' : 'white', }}>About</a>
            </li>
            <li>
              <a href="#features" className="page-scroll" style={{ fontWeight: 'bold', color: scrolling ? 'red' : 'white', }}>Features</a>
            </li>
            <li>
              <a href="#projects" className="page-scroll" style={{ fontWeight: 'bold', color: scrolling ? 'red' : 'white', transition: 'color 0.5s' }}>Projects</a>
            </li>
            <li>
              <a href="#contact" className="page-scroll" style={{ fontWeight: 'bold', color: scrolling ? 'red' : 'white', transition: 'color 0.5s' }}>Contact</a>
            </li>
            {/* <input type="checkbox" className="checkbox" id="checkbox"/>
              <label htmlFor="checkbox" className="checkbox-label">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <span className="ball"></span>
              </label> */}
         
          </ul>
        </div>
      </div>
    </nav>
  );
};
