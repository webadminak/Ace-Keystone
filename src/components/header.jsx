import React, { useEffect, useState, useMemo } from "react";
import './main.module.css';
import AOS from "aos";
import "aos/dist/aos.css";


export const Header = () => {

  const slides = useMemo(() => [
    {
      image: "/img/img14.webp",
      title: "AI ∧ Automation = Efficiency at Scale",
      paragraph:
        "Transforming processes through AI and automation to deliver scalable, high-efficiency solutions",
    },
    {
      image: "/img/img18.webp",
      title: "Smart Systems + Adaptive Algorithms = Future-Ready Hardware",
      paragraph:
        "Creating hardware solutions that evolve through adaptive algorithms, anticipating and meeting future demands",
    },
    {
      image: "/img/img16.webp",
      title: "Potential >= Passion",
      paragraph:
        "Achieve growth with trusted partners, leveraging tech for a sustainable digital transformation",
    },
    {
      image: "/img/img11.webp",
      title: "Innovation + Sustainability = Endless Impact",
      paragraph: "Innovating with sustainability to create lasting, positive change",
    },
  ], []);

  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [slides]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true,     // Only animate once
    });
  }, []);

  useEffect(() => {
    setFade(true);
    const fadeTimeout = setTimeout(() => setFade(false), 500);
    const slideTimeout = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(slideTimeout);
    };
  }, [current, slides.length]);

  return (
    <header id="header" data-aos="fade-up">
      <section className="intro" data-aos="fade-up">
        <div className="image-background" data-aos="fade-up"></div>
        <div className={`slide-container ${fade ? "fade-out" : "fade-in"}`} >
          <div className="hero-overlay"></div>
          <img src={slides[current].image} alt="Slide" className="slide-image" />
          <div className={`hero-content ${fade ? "text-fade-out" : "text-fade-in"}`} >
            <h1 data-aos="fade-up">{slides[current].title}</h1>
            <p data-aos="fade-up">{slides[current].paragraph}</p>
          </div>
        </div>
        <style>{`
        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0) 80%);
          z-index: 1;
          pointer-events: none;
        }
        .slide-container {
          position: absolute;
          top: 0;  /* Ensure it starts from the very top */
          left: 0;
          width: 100vw;  /* Ensure it fully covers the viewport */
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: opacity 0.8s ease-in-out;
          overflow: hidden;  /* Prevents any extra pixels from showing */
      }

        .slide-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          transition: opacity 0.8s ease-in-out;
        }
        .hero-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: #fff;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 900px;
        }
        .hero-content h1 {
          font-weight: bold;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 20px rgba(0, 0, 0, 1);
        }
        .hero-content p {
          font-size: 20px;
          line-height: 1.5;
          text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.6);
          position: relative;
          justify-content: center;
          align-items: center;
          justify-content: center;
        }
        `}</style>
      </section>
    </header>
  );
};
