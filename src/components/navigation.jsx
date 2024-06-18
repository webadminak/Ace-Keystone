import React, { useState, useEffect } from "react";
import logo from "../data/logo.jpg.png";

export const Navigation = (props) => {
  const [scrolling, setScrolling] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      id="menu"
      className={`navbar navbar-default navbar-fixed-top ${
        scrolling ? "navbar-scrolled" : ""
      }`}
      style={{
        backgroundColor: scrolling ? "black" : "transparent",
        transition: "background-color 0.5s",
      }}
    >
      <div className="container">
        <div className="navbar-header">
          <div className="logo-container">
            <img
              src={logo}
              alt="logo"
              width="90"
              height="64"
              className="logo"
            />
            <a
              className="navbar-brand page-scroll"
              href="#page-top"
              style={{
                fontWeight: "bold",
                color: scrolling ? "white" : "white",
                transition: "color 0.5s",
                fontSize: "24px", // Default font size
              }}
            >
              Adept Knowledge Technologies
            </a>
          </div>

          <button
            type="button"
            className={`navbar-toggle ${isMobileMenuOpen ? "active" : ""}`}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
        </div>
        <div
          className={`collapse navbar-collapse ${
            isMobileMenuOpen ? "show" : ""
          }`}
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
            <a
                href="#about"
                className="page-scroll"
                style={{
                  fontWeight: "bold",
                  color: scrolling ? "white" : "white",
                }}
              >
                About Us
              </a>
            </li>
            <li>
            <a
                href="#features"
                className="page-scroll"
                style={{
                  fontWeight: "bold",
                  color: scrolling ? "white" : "white",
                }}
              >
                Services
              </a>
            </li>
            <li>
            {/* <a
                href="#projects"
                className="page-scroll"
                style={{
                  fontWeight: "bold",
                  color: scrolling ? "white" : "white",
                  transition: "color 0.5s",
                }}
              >
                Projects
              </a> */}
            </li>
            <li>
            <a
                href="#contact"
                className="page-scroll"
                style={{
                  fontWeight: "bold",
                  color: scrolling ? "white" : "white",
                  transition: "color 0.5s",
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
