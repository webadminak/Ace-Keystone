import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../data/logo.png";
import styles from "./Header.module.css";
import AOS from "aos";
import "aos/dist/aos.css";


export const Navigation = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isMobileView, setIsMobileView] = useState(false); // For detecting mobile view

  // Refs to detect clicks outside
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect mobile view based on screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on component mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true,     // Only animate once
    });
  }, []);


  // Click outside logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };



  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const navbarBackground =
    (scrolling || location.pathname !== "/")
      ? styles.navbarScrolled
      : "";

  // Mobile styles (inline)
  const mobileOverlayStyles = isMobileMenuOpen ? {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // grey overlay
    zIndex: "999", // Behind the dropdown links
    pointerEvents: "none", // Make sure it doesn't block the clicks
  } : {};

  const mobileDropdownStyles = isMobileMenuOpen ? {
    position: "fixed",
    top: "50px", // Below the header
    left: "0",
    width: "100%",
    background: "linear-gradient(to bottom, black, rgba(0, 0, 0, 0.5))",
    color: "white",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    zIndex: "1000", // Higher than the overlay
    display: "flex",
    flexDirection: "column",
    padding: "20px 0",
    pointerEvents: "auto", // Ensure links are clickable
  } : {};

  return (
    <nav id="menu" className={`${styles.navbar} ${navbarBackground}`}>
      <div className={styles.container}>
        <div className={styles.navbarHeader}>
          <div className={styles.logoContainer} data-aos="fade-up">
            <NavLink to="/" className={styles.logoLink} data-aos="fade-up">
              <img src={logo} alt="logo" className={styles.logo} />
            </NavLink>
            <a className={`${styles.navbarBrand} customNavbarBrand`} href="/" data-aos="fade-up">
              Ace Keystone Consultants
            </a>
          </div>
          <button
            type="button"
            className={`${styles.navbarToggle} ${isMobileMenuOpen ? styles.active : ""}`}
            onClick={toggleMobileMenu}
            ref={mobileMenuRef}
          >
            <span className={styles.iconBar}></span>
            <span className={styles.iconBar}></span>
            <span className={styles.iconBar}></span>
          </button>
        </div>

        {/* Desktop Navigation (Dropdown below hamburger icon) */}
        {!isMobileView && (
          <div className={`${styles.navbarCollapse} ${isMobileMenuOpen ? styles.show : ""}`} ref={mobileMenuRef} >
            <ul className={styles.navbarNav}>
              <li data-aos="fade-up">
                <NavLink to="/about" className={styles.pageScroll} onClick={handleNavLinkClick}>
                  About Us
                </NavLink>
              </li>
              <li data-aos="fade-up">
                <NavLink to="/teams" className={styles.pageScroll} onClick={handleNavLinkClick}>
                  Our Team
                </NavLink>
              </li>
              <li data-aos="fade-up">
                <NavLink to="/ourtech" className={styles.pageScroll} onClick={handleNavLinkClick}>
                  Our Tech
                </NavLink>
              </li>

              <li data-aos="fade-up">
                <NavLink to="/services" className={styles.pageScroll} onClick={handleNavLinkClick}>
                  Our Services
                </NavLink>
              </li>
              <li data-aos="fade-up">
                <NavLink to="/careers" className={styles.pageScroll} onClick={handleNavLinkClick}>
                  Careers
                </NavLink>
              </li>

              <li data-aos="fade-up">
                <NavLink to="/contact" className={`${styles.pageScroll}`} onClick={handleNavLinkClick}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>


      {/* Mobile View Overlay */}
      {isMobileView && isMobileMenuOpen && <div style={mobileOverlayStyles}></div>}

      {/* Mobile View Navigation (Above the grey overlay) */}
      {isMobileView && isMobileMenuOpen && (
        <div style={mobileDropdownStyles} data-aos="fade-down"  data-aos-duration="300">
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: "absolute",
              top: "10px",
              right: "40px",
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "28px",
              cursor: "pointer",
              zIndex: 1001
            }}
            aria-label="Close menu"
          >
            ✕
          </button>
          <NavLink to="/about" className={styles.dropdownLink} onClick={handleNavLinkClick}>
            About Us
          </NavLink>
          <NavLink to="/teams" className={styles.dropdownLink} onClick={handleNavLinkClick}>
            Our Team
          </NavLink>
          <NavLink to="/ourtech" className={styles.dropdownLink} onClick={handleNavLinkClick}>
            Our Tech
          </NavLink>
          <NavLink to="/services" className={styles.dropdownLink} onClick={handleNavLinkClick}>
            Our Services
          </NavLink>
          <NavLink to="/careers" className={styles.dropdownLink} onClick={handleNavLinkClick}>
            Careers
          </NavLink>
          <NavLink to="/contact" className={styles.dropdownLink} onClick={handleNavLinkClick}>
            Contact Us
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
