import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import medicalImg from "../img/Data and AI.webp";
import agritechImg from "../img/medical tech.jpg";
import defenseImg from "../img/digital transformation.png";
import lifescienceImg from "../img/sustainability.jpg";
import semiconductorImg from "../img/wifi.jpg";
import "./ourtech.css";
import { Helmet } from "react-helmet";


const services = [
  {
    title: "AI & Data",
    img: medicalImg,
    description:
      "Empowering businesses with intelligent, data-driven solutions. Our AI and analytics tools uncover insights, automate processes, and enhance decision-making. From predictive models to real-time dashboards, we turn data into value. Stay ahead with smarter strategies powered by AI."
  },
  {
    title: "MedTech Innovations",
    img: agritechImg,
    description:
      "Innovating healthcare with precision-focused medical technologies. We design smart devices that support early diagnosis, accurate monitoring, and effective treatment. Our solutions enhance clinical outcomes and patient safety. Technology that redefines the future of care."
  },
  {
    title: "Digital Transformation",
    img: defenseImg,
    description:
      "Enabling seamless evolution from legacy systems to digital-first operations. We modernize infrastructure, automate workflows, and connect data across platforms. Our solutions drive agility, efficiency, and scalability. Transform your business to lead in a digital world."
  },
  {
    title: "Eco-Driven Solutions",
    img: lifescienceImg,
    description:
      "Driving impact through clean and responsible technology. Our solutions help reduce emissions, save energy, and promote circular practices. We integrate sustainability into every layer of innovation. Building a greener, smarter, more resilient future."
  },
  {
    title: "Wireless Connectivity",
    img: semiconductorImg,
    description:
      "Delivering reliable, high-speed wireless solutions for all environments. From smart homes to industrial networks, we ensure seamless connectivity. Our technologies are built for performance, scalability, and security. Stay connected—anytime, anywhere, without compromise."
  }
];

const ServiceCard = ({ title, img, description }) => {
  return (
    <motion.div className="service-card" whileHover={{ scale: 1.03 }}>
      <div className="service-card-image">
        <img src={img} alt={title} />
        <div className="service-card-gradient"></div>
        <div className="service-card-title-container">
          <h3 className="service-title">{title}</h3>
        </div>
      </div>
      <motion.div
        className="service-hover-content"
        whileHover={{ opacity: 1 }}
        onHoverStart={(e) => {
          const title = e.target.closest(".service-title");
          if (title) title.style.color = "#012945";
        }}
        onHoverEnd={(e) => {
          const title = e.target.closest(".service-title");
          if (title) title.style.color = "white";
        }}
      >
        <h3>{title}</h3>
        <p>{description}</p>
        <motion.div whileHover={{ x: 6 }}></motion.div>
      </motion.div>
    </motion.div>
  );
};

const ServicesPage = () => {

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
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Tech</title>
        <link rel="canonical" href="https://www.ak-tech.in/ourtech" />
      </Helmet>
      <div className="services-container" data-aos="fade-up">
        <h2 className="main-heading" data-aos="fade-up">Our Tech</h2>
        <p className="main-description" data-aos="fade-up" style={{ color: "black" }}>
          We leverage next-generation technologies to solve real-world challenges and create impactful solutions. Our technological capabilities span diverse domains ranging from artificial intelligence and digital transformation to wireless connectivity and sustainable innovation. By integrating cutting-edge tools with industry expertise, we help our clients drive smarter decisions, streamline operations, and unlock new growth opportunities. Explore the technologies that form the backbone of our innovative solutions and shape the future of industries.
        </p>
        <div className="card-grid" data-aos="fade-up">
          <div className="card-row" data-aos="fade-up">
            <ServiceCard {...services[0]} />
            <ServiceCard {...services[1]} />
          </div>
          <div className="card-row" data-aos="fade-up">
            <ServiceCard {...services[2]} />
            <ServiceCard {...services[3]} />
          </div>
          <div className="card-row single" data-aos="fade-up">
            <ServiceCard {...services[4]} />
          </div>
        </div>
      </div>
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <i className="fa fa-arrow-up" style={{ position: 'relative', right: '1.5px' }}></i>


        </button>
      )}

      <div id="footer" className="footer">
        <div className="container text-center">
          <p>&copy; 2025 AK Technologies Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;