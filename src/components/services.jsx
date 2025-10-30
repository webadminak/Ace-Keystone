// src/services.jsx
import React, { useEffect, useLayoutEffect } from "react";
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
import { useNavigate } from "react-router-dom";

import LottieFlow from "./LottieFlow";

/* --- Helpers to fix scroll nudge --- */
function waitForImagesToLoad(timeout = 2000) {
  const imgs = Array.from(document.images || []);
  if (!imgs.length) return Promise.resolve();

  const unfinished = imgs.filter((img) => !img.complete);
  if (!unfinished.length) return Promise.resolve();

  return new Promise((resolve) => {
    let settled = false;
    let remaining = unfinished.length;

    const checkDone = () => {
      if (settled) return;
      remaining -= 1;
      if (remaining <= 0) {
        settled = true;
        resolve();
      }
    };

    unfinished.forEach((img) => {
      img.addEventListener("load", checkDone, { once: true });
      img.addEventListener("error", checkDone, { once: true });
    });

    setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve();
      }
    }, timeout);
  });
}

async function reapplyScrollAfterAssets(y) {
  await waitForImagesToLoad(1800);
  await new Promise((r) => setTimeout(r, 80));
  const prev = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, Math.max(0, y));
  document.documentElement.style.scrollBehavior = prev;
}
/* --- end helpers --- */

const services = [
  {
    title: "Geospatial",
    img: map,
    description:
      "We convert physical infrastructure into intelligent digital maps using advanced geospatial tools.Our solutions enable real-time tracking, route optimization, and smart mobility insights.From roads to assets, everything is mapped with precision and purpose."
  },
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
];

const ServiceCard = ({ title, img, description }) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    try {
      const y = window.scrollY || window.pageYOffset || 0;
      sessionStorage.setItem("services_scroll", String(y));
    } catch (e) {}

    try {
      const y = window.scrollY || window.pageYOffset || 0;
      const st = window.history.state || {};
      const newState = { ...st, services_scroll: y };
      window.history.replaceState(newState, document.title);
    } catch (err) {}

    navigate("/services/geo-spatial");
  };

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
          const titleEl = e.target.closest(".service-title");
          if (titleEl) titleEl.style.color = "#012945";
        }}
        onHoverEnd={(e) => {
          const titleEl = e.target.closest(".service-title");
          if (titleEl) titleEl.style.color = "white";
        }}
      >
        <h3>{title}</h3>
        <p>{description}</p>

        {title === "Geospatial" && (
          <button
            onClick={handleExplore}
            className="explore-btn"
            style={{
              marginTop: "10px",
              padding: "10px 22px",
              background: "linear-gradient(135deg, #164d8b, #2979ff)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(22, 77, 139, 0.25)",
            }}
          >
            Explore
          </button>
        )}

        <motion.div whileHover={{ x: 6 }}></motion.div>
      </motion.div>
    </motion.div>
  );
};

const ServicesPage = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const headingRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 300;
      setShowScrollTop(show);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.lottieFlowActive = false;
    };
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = "manual";
      } catch (e) {}
    }
  }, []);

// inside services.jsx (replace your existing useLayoutEffect block with this)

/* small helper to add/remove the restore class safely */
function enableRestoreMask() {
  try {
    document.documentElement.classList.add("scroll-restoring");
  } catch (e) {}
}
function disableRestoreMask() {
  try {
    document.documentElement.classList.remove("scroll-restoring");
  } catch (e) {}
}

useLayoutEffect(() => {
  // add mask BEFORE any paint/scroll so user doesn't see the wrong spot
  enableRestoreMask();

  // temporarily disable smooth scroll while we set the exact position
  const prevScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";

  let restored = false;
  const cleanupAndRemoveMask = () => {
    if (restored) return;
    restored = true;
    // restore scroll-behavior
    document.documentElement.style.scrollBehavior = prevScrollBehavior;
    // remove mask so page becomes visible again
    disableRestoreMask();
  };

  try {
    const st = window.history.state;
    if (st && typeof st.services_scroll === "number") {
      // immediate synchronous jump to saved value
      window.scrollTo(0, Math.max(0, st.services_scroll));
      // reapply after assets settle (your helper); when it finishes will re-enable view
      reapplyScrollAfterAssets(st.services_scroll).then(() => {
        // remove saved key from history state
        try {
          const newState = { ...st };
          delete newState.services_scroll;
          window.history.replaceState(newState, document.title);
        } catch (e) {}
        cleanupAndRemoveMask();
      });
      // safety timeout fallback: if helper hangs, unmask after 2s
      setTimeout(cleanupAndRemoveMask, 2000);
      return; // early exit
    }
  } catch (e) {
    // ignore and continue to sessionStorage fallback
  }

  try {
    const saved = sessionStorage.getItem("services_scroll");
    if (saved) {
      const y = parseInt(saved, 10) || 0;
      window.scrollTo(0, y);
      reapplyScrollAfterAssets(y).then(() => {
        try {
          sessionStorage.removeItem("services_scroll");
        } catch (e) {}
        cleanupAndRemoveMask();
      });
      setTimeout(cleanupAndRemoveMask, 2000);
      return;
    }
  } catch (e) {
    // ignore
  }

  // If nothing to restore, just remove mask immediately (no visible jump expected)
  cleanupAndRemoveMask();
}, []);


  // Robust post-mount restore + delayed AOS init
  useEffect(() => {
    let attempts = 0;
    let canceled = false;

    const doRestore = () => {
      if (canceled) return;
      attempts += 1;

      // read from history.state first, then sessionStorage
      let y = 0;
      try {
        const st = window.history.state;
        if (st && typeof st.services_scroll === "number") {
          y = st.services_scroll;
          // remove it afterwards
          try {
            const newState = { ...st };
            delete newState.services_scroll;
            window.history.replaceState(newState, document.title);
          } catch (e) {}
        } else {
          const s = sessionStorage.getItem("services_scroll");
          if (s) {
            y = parseInt(s, 10) || 0;
          }
        }
      } catch (e) {
        // ignore
      }

      // Apply scroll synchronously where possible (force 'auto' behavior briefly)
      if (typeof y === "number" && y > 0) {
        const prev = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, y);
        document.documentElement.style.scrollBehavior = prev;
      }

      // Try a few times (some libraries/images change layout after mount)
      if (attempts < 4) {
        requestAnimationFrame(() => {
          setTimeout(doRestore, 80 * attempts);
        });
      } else {
        if (!canceled) {
          try {
            AOS.init({ duration: 1000, once: true });
          } catch (err) {
            console.warn("AOS init failed:", err);
          }
          (window).__services_scroll_restored = true;
        }
      }
    };

    doRestore();

    return () => {
      canceled = true;
    };
  }, []);

  // popstate fallback (user presses back)
  useEffect(() => {
    const onPop = () => {
      try {
        const saved = sessionStorage.getItem("services_scroll");
        if (saved) {
          const y = parseInt(saved, 10) || 0;
          requestAnimationFrame(() => {
            // do immediate scroll (non-smooth)
            const prev = document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = "auto";
            window.scrollTo(0, y);
            document.documentElement.style.scrollBehavior = prev;
          });
          sessionStorage.removeItem("services_scroll");
        } else {
          const st = window.history.state;
          if (st && typeof st.services_scroll === "number") {
            const y = st.services_scroll;
            requestAnimationFrame(() => {
              const prev = document.documentElement.style.scrollBehavior;
              document.documentElement.style.scrollBehavior = "auto";
              window.scrollTo(0, y);
              document.documentElement.style.scrollBehavior = prev;
            });
            try {
              const newState = { ...st };
              delete newState.services_scroll;
              window.history.replaceState(newState, document.title);
            } catch (e) {}
          }
        }
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const scrollToTop = () => {
    if (window.__lottie_pause) window.__lottie_pause();
    if (window.__lottie_collapse) window.__lottie_collapse();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      if (window.__lottie_resume) window.__lottie_resume();
    }, 900);
  };

  return (
    <>
      <Helmet>
        <title>Our Services</title>
        <link rel="canonical" href="https://www.ak-consultants.in/services.html" />
      </Helmet>
      <div className="services-container" data-aos="fade-up">
        <h2 className="main-heading" data-aos="fade-up">Our Services</h2>
        <p className="main-description" data-aos="fade-up" style={{ color: "black" }}>
          We deliver cutting-edge services across a diverse range of industries, empowering clients to achieve breakthroughs,
          enhance operational efficiency, and drive sustained innovation. Our multidisciplinary expertise spans six core domains,
          each designed to foster transformation, accelerate growth, and create long-term value. By combining advanced technologies
          with deep industry insight, we help organizations stay ahead in rapidly evolving markets.
        </p>

        <div style={{ padding: "0px 0" }}>
          <LottieFlow scrollTargetRef={headingRef} />
        </div>

        <h2
          ref={headingRef}
          className="main-heading"
          data-aos="fade-up"
          style={{ padding: "70px 0px 70px 0px" }}
        >
          Our Proficient Fields
        </h2>

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
