import React, { useEffect } from "react";
import styles from "./AboutUs.module.css";
import aboutImage from "../img/about-us.jpg"; // replace with your image path
import { FaCheckCircle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";


const AboutUs = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true,     // Only animate once
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>About Us | AK Consultants</title>
        <meta name="description" content="Learn about AK Consultants – a forward-thinking company founded in 2020, dedicated to delivering innovative, scalable solutions in AI, smart infrastructure, and business strategy." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ak-tech.in/about" />

        {/* Open Graph for better social preview */}
        <meta property="og:title" content="About Us | AK Consultants" />
        <meta property="og:description" content="Discover our mission and team at AK Consultants, delivering excellence through innovation since 2020." />
        <meta property="og:image" content="https://www.ak-tech.in/static/media/about-us.eeddcd253edfca07c2a0.jpg" />
        <meta property="og:url" content="https://www.ak-tech.in/about" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | AK Consultants" />
        <meta name="twitter:description" content="Explore AK Consultants' vision and team, shaping solutions for real-world problems using AI and smart tech." />
        <meta name="twitter:image" content="https://www.ak-tech.in/static/media/about-us.eeddcd253edfca07c2a0.jpg" />
      </Helmet>

      <div className={styles.stackedWrapper}>
        <div className={styles.stackedSection}>
          <div className={styles.imageBox} data-aos="fade-up">
            <img src={aboutImage} alt="AK Tech Team" />
          </div>
          <div className={styles.textCard} data-aos="fade-up">
            <h2>
              We’re here to help businesses <span>grow</span> and evolve through innovation.
            </h2>
            <p>
              At AK Consultants, we believe that innovation is more than just technology, it’s the mindset that drives
              meaningful transformation. Founded in 2020, our mission is to solve real-world problems using forward-thinking,
              scalable solutions.
            </p>
            <p>
              Our diverse and passionate team brings together expertise in AI, autonomous systems, business strategy,
              and smart infrastructure united by a shared commitment to excellence.
            </p>
          </div>
        </div>

        {/* Company Mission Section */}


      </div>
      <div className={styles.missionSection} >
        <h3>ABOUT AK CONSULTANTS</h3>
        <p data-aos="fade-up">
          AK consultants were established in 2020, with the aim of deriving and
          delivering cutting-edge innovative solutions in response to challenges across a variety of problem areas.
          Our goal is to develop a team of experts who will provide the right solution to businesses, whilst creating a nurturing environment to thrive.
          We are always looking for an opportunity to prove our passion and with a team that comprises enthusiasts across autonomous sensing systems,
          artificial Intelligence, urban planning, and business development, our team is ready and committed to delivering excellence.
        </p>

        <h4>WHY CHOOSE US</h4>
        <div className={styles.whyChooseContainer} data-aos="fade-up">
          <ul className={styles.bulletList} data-aos="fade-up">
            <li><FaCheckCircle /> Proven Expertise</li>
            <li><FaCheckCircle /> Quality Assurance</li>
            <li><FaCheckCircle /> Innovative Solutions</li>
            <li><FaCheckCircle /> Timely Delivery</li>
            <li><FaCheckCircle /> Customization</li>
            <li><FaCheckCircle /> Cost-Effective Solutions</li>
            <li><FaCheckCircle /> User-Centric Design</li>
            <li><FaCheckCircle /> Transparent Communication</li>
          </ul>
        </div>

      </div>
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <i className="fa fa-arrow-up" style={{ position: 'relative', right: '1.5px' }}></i>


        </button>
      )}
      <div className={styles.footer}>
        <div className="container text-center">
          <p>&copy; 2025 AK Consultants Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
