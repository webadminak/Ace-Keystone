import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import medicalImg from "../img/Medical Devices.jpg";
import agritechImg from "../img/Agri Tech.jpeg";
import defenseImg from "../img/Defense & Security.jpeg";
import lifescienceImg from "../img/Life Science.jpeg";
import semiconductorImg from "../img/Semi conductors.jpeg";
import telecomImg from "../img/telecomm.jpg";
import transport from "../img/transport.jpeg";
import map from "../img/map.jpg";
import "./services.module.css";
import { Helmet } from "react-helmet";


const services = [
  {
    title: "Smart Healthcare",
    img: medicalImg,
    description:
      "Precision-engineered tools that save lives and shape the future of modern healthcare.From diagnostics to surgical innovation—where technology meets healing."
  },
  {
    title: "Agritech",
    img: agritechImg,
    description:
      "Imagine AI in the field, drones in the sky, and data at the roots. Our Agri Tech solutions bring innovation to the soil—helping farmers grow more with less and feed the future sustainably."
  },
  {
    title: "Defense & Security",
    img: defenseImg,
    description:
      "In a world of complex threats, we deliver intelligent defence tech that sees, predicts, and protects. From battlefield to cybersecurity, we build systems you can trust—when it matters most."
  },
  {
    title: "Life Sciences",
    img: lifescienceImg,
    description:
      "From lab bench to real-world impact—our life science solutions fuel breakthroughs in biotech, pharma, and diagnostics. We help turn research into life-saving results, one discovery at a time."
  },
  {
    title: "Semiconductors",
    img: semiconductorImg,
    description:
      "They power your phone, your car, and your future. Our semiconductor innovations are the silent force behind faster tech, smarter devices, and a more connected world. The future runs on silicon—and so do we."
  },
  {
    title: "Telecommunication",
    img: telecomImg,
    description:
      "From 5G breakthroughs to seamless digital communication, we’re at the heart of how the world talks, works, and grows. Whether it's smart cities or remote collaboration, we make connections stronger and smarter."
  },
  {
    title: "Connected Mobility Services",
    img: transport,
    description:
      "We build smart, integrated mobility solutions that connect vehicles, infrastructure, and people through real-time data and AI-driven platforms.From safety systems to route optimization and live monitoring, our technologies enhance the way transport networks operate."
  },
  {
    title: "Map Digitalisation",
    img: map,
    description:
      "We convert physical infrastructure into intelligent digital maps using advanced geospatial tools.Our solutions enable real-time tracking, route optimization, and smart mobility insights.From roads to assets, everything is mapped with precision and purpose."
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
        <title>Our Services</title>
        <link rel="canonical" href="https://www.ak-tech.in/services" />
      </Helmet>
      <div className="services-container" data-aos="fade-up">
        <h2 className="main-heading" data-aos="fade-up">Our Services</h2>
        <p className="main-description" data-aos="fade-up" style={{ color: "black" }}>
          We deliver cutting-edge services across a diverse range of industries, empowering clients to achieve breakthroughs,
          enhance operational efficiency, and drive sustained innovation. Our multidisciplinary expertise spans six core domains,
          each designed to foster transformation, accelerate growth, and create long-term value. By combining advanced technologies
          with deep industry insight, we help organizations stay ahead in rapidly evolving markets.
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
            <ServiceCard {...services[5]} />
          </div>
          <div className="card-row single" data-aos="fade-up">
            <ServiceCard {...services[6]} />
            <ServiceCard {...services[7]} />
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
          <p>&copy; 2025 AK Consultants Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;