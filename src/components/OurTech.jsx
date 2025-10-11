// src/ServicesPage.jsx
import React, { useEffect, useState, useRef } from "react";
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

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

/* ---------------- services data ---------------- */
const services = [
  {
    title: "Digital Transformation",
    img: defenseImg,
    description:
      "Enabling seamless evolution from legacy systems to digital-first operations. We modernize infrastructure, automate workflows, and connect data across platforms. Our solutions drive agility, efficiency, and scalability. Transform your business to lead in a digital world.",
  },
  {
    title: "AI & Data",
    img: medicalImg,
    description:
      "Empowering businesses with intelligent, data-driven solutions. Our AI and analytics tools uncover insights, automate processes, and enhance decision-making. From predictive models to real-time dashboards, we turn data into value. Stay ahead with smarter strategies powered by AI.",
  },
  {
    title: "MedTech Innovations",
    img: agritechImg,
    description:
      "Innovating healthcare with precision-focused medical technologies. We design smart devices that support early diagnosis, accurate monitoring, and effective treatment. Our solutions enhance clinical outcomes and patient safety. Technology that redefines the future of care.",
  },
  {
    title: "Eco-Driven Solutions",
    img: lifescienceImg,
    description:
      "Driving impact through clean and responsible technology. Our solutions help reduce emissions, save energy, and promote circular practices. We integrate sustainability into every layer of innovation. Building a greener, smarter, more resilient future.",
  },
  {
    title: "Wireless Connectivity",
    img: semiconductorImg,
    description:
      "Delivering reliable, high-speed wireless solutions for all environments. From smart homes to industrial networks, we ensure seamless connectivity. Our technologies are built for performance, scalability, and security. Stay connected—anytime, anywhere, without compromise.",
  },
];

/* ---------------- MultiStepForm ---------------- */
/* ... keep your MultiStepForm implementation as-is ... */
/* For brevity in this message I keep the same MultiStepForm code you already had.
   Paste your MultiStepForm implementation here unchanged (from your current file).
   (In the version below I'll keep the same MultiStepForm component body you provided earlier.)
*/

const MultiStepForm = ({ onClose }) => {
  // (use your full MultiStepForm content — unchanged)
  // For brevity, I'm reusing the implementation from your original file.
  // Paste your MultiStepForm code here exactly as before.
  // --- BEGIN original MultiStepForm ---
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [ackChecked, setAckChecked] = useState(false);

  const [appTypeSelected, setAppTypeSelected] = useState(formData.appType || "");
  const [platformSelected, setPlatformSelected] = useState(formData.platform || "");

  useEffect(() => {
    if (formData.appType) setAppTypeSelected(formData.appType);
    if (formData.platform) setPlatformSelected(formData.platform);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const v = type === "checkbox" ? checked : value;
    setFormData((s) => ({ ...s, [name]: v }));

    if (name === "appTypeRadio") {
      setAppTypeSelected(value);
      setFormData((s) => ({ ...s, appType: value }));
      if (value !== "Other") setFormData((s) => ({ ...s, appTypeOtherText: "" }));
    }
    if (name === "appTypeOtherText") {
      setFormData((s) => ({ ...s, appTypeOtherText: value }));
      setAppTypeSelected("Other");
      setFormData((s) => ({ ...s, appType: "Other" }));
    }
    if (name === "platformRadio") {
      setPlatformSelected(value);
      setFormData((s) => ({ ...s, platform: value }));
      if (value !== "OtherPlatform") setFormData((s) => ({ ...s, platformOtherText: "" }));
    }
    if (name === "platformOtherText") {
      setFormData((s) => ({ ...s, platformOtherText: value }));
      setPlatformSelected("OtherPlatform");
      setFormData((s) => ({ ...s, platform: "OtherPlatform" }));
    }
  };

  const handleNext = () => setStep((s) => Math.min(8, s + 1));
  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    if (!formData.companyName || !formData.businessGoals) {
      await Swal.fire({
        icon: "warning",
        title: "Missing required fields",
        text: "Please fill required fields on Business Overview (Company Name and Business Goals).",
      });
      setStep(1);
      return;
    }
    if (!ackChecked) {
      await Swal.fire({
        icon: "warning",
        title: "Acknowledgement required",
        text: "Please confirm acknowledgement before submitting.",
      });
      return;
    }

    const payload = {
      access_key: "26f35bf7-2756-48d9-a8b2-da86300dc1f5",
      subject: "Digital Transformation Form Submission",
      email: "fst_engineer1@ak-tech.in",
      ...formData,
    };

    Swal.fire({
      title: "Submitting...",
      html: "Please wait while we send your information.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      Swal.close();

      if (res.ok) {
        await Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "Your form was submitted successfully. We'll contact you soon.",
          confirmButtonText: "OK",
        });
        onClose();
      } else {
        console.error("Web3Forms error:", json);
        await Swal.fire({
          icon: "error",
          title: "Submission failed",
          text: json?.message || "Submission failed. Please try again later.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.close();
      await Swal.fire({
        icon: "error",
        title: "Network error",
        text: "There was a network error while submitting. Please try again later.",
      });
    }
  };

  const withMinHeight = (children, title) => (
    <div className="form-page">
      <h3 className="form-heading">{title}</h3>
      {children}
    </div>
  );

  const pages = {
    1: withMinHeight(
      <>
        <label>
          1. Company Name <span className="required">*</span>
        </label>
        <input name="companyName" placeholder="Enter your answer" onChange={handleChange} value={formData.companyName || ""} required />

        <label>
          2. Briefly describe your business and its goals. <span className="required">*</span>
        </label>
        <textarea name="businessGoals" placeholder="Enter your answer" onChange={handleChange} value={formData.businessGoals || ""} required />

        <label>3. What problem are you trying to solve with this app?</label>
        <textarea name="problem" placeholder="Enter your answer" onChange={handleChange} value={formData.problem || ""} />

        <label>4. Who are your target users?</label>
        <textarea name="targetUsers" placeholder="Enter your answer" onChange={handleChange} value={formData.targetUsers || ""} />
      </>,
      "Business Overview"
    ),
    2: withMinHeight(
      <>
        <label>
          5. What type of app are you looking to develop? <span className="required">*</span>
        </label>

        <div className="radio-list">
          <label className={`radio-item ${appTypeSelected === "ECommerce" ? "checked" : ""}`}>
            <input type="radio" name="appTypeRadio" value="ECommerce" checked={appTypeSelected === "ECommerce"} onChange={handleChange} />
            <span className="radio-visual" />
            <span className="radio-label">ECommerce</span>
          </label>

          <label className={`radio-item ${appTypeSelected === "Social media" ? "checked" : ""}`}>
            <input type="radio" name="appTypeRadio" value="Social media" checked={appTypeSelected === "Social media"} onChange={handleChange} />
            <span className="radio-visual" />
            <span className="radio-label">Social media</span>
          </label>

          <label className={`radio-item ${appTypeSelected === "Productivity" ? "checked" : ""}`}>
            <input type="radio" name="appTypeRadio" value="Productivity" checked={appTypeSelected === "Productivity"} onChange={handleChange} />
            <span className="radio-visual" />
            <span className="radio-label">Productivity</span>
          </label>

          <label className={`radio-item ${appTypeSelected === "Educational" ? "checked" : ""}`}>
            <input type="radio" name="appTypeRadio" value="Educational" checked={appTypeSelected === "Educational"} onChange={handleChange} />
            <span className="radio-visual" />
            <span className="radio-label">Educational</span>
          </label>

          <label className={`radio-item ${appTypeSelected === "Other" ? "checked" : ""}`} style={{ alignItems: "center" }}>
            <input type="radio" name="appTypeRadio" value="Other" checked={appTypeSelected === "Other"} onChange={handleChange} />
            <span className="radio-visual" />
            <span className="radio-label">Other</span>
            <input name="appTypeOtherText" placeholder="Enter your answer" value={formData.appTypeOtherText || ""} onChange={handleChange} className="inline-other" aria-label="Other app type" />
          </label>
        </div>

        <label className="mt-10">Platforms the app should support <span className="required">*</span></label>

        <div className="radio-list">
          {["iOS", "Android", "Web", "All of the above"].map((p) => (
            <label key={p} className={`radio-item ${platformSelected === p ? "checked" : ""}`}>
              <input type="radio" name="platformRadio" value={p} checked={platformSelected === p} onChange={handleChange} />
              <span className="radio-visual" />
              <span className="radio-label">{p}</span>
            </label>
          ))}
        </div>

        <label>11. Are there any accessibility requirements?</label>
        <textarea name="accessibility" placeholder="Enter your answer" onChange={handleChange} value={formData.accessibility || ""} />
      </>,
      "App Concept & Goals"
    ),
    3: withMinHeight(
      <>
        <label>12. Do you have a preferred design style or branding guidelines?</label>
        <textarea name="designStyle" placeholder="Enter your answer" onChange={handleChange} value={formData.designStyle || ""} />

        <label>13. Are there any color schemes or logos you want to include?</label>
        <input name="colorScheme" placeholder="Enter your answer" onChange={handleChange} value={formData.colorScheme || ""} />

        <label>14. Do you have wireframes or mockups ready?</label>
        <input name="wireframes" placeholder="Enter your answer" onChange={handleChange} value={formData.wireframes || ""} />
      </>,
      "Design Preferences"
    ),
    4: withMinHeight(
      <>
        <label>15. List the core features you want in the app.</label>
        <textarea name="features" placeholder="Enter your answer" onChange={handleChange} value={formData.features || ""} />

        <label>16. Will the app require user authentication or login?</label>
        <input name="auth" placeholder="Enter your answer" onChange={handleChange} value={formData.auth || ""} />

        <label>17. Will it include payment processing?</label>
        <input name="payments" placeholder="Enter your answer" onChange={handleChange} value={formData.payments || ""} />

        <label>18. Will it need integration with third-party services or APIs?</label>
        <input name="apis" placeholder="Enter your answer" onChange={handleChange} value={formData.apis || ""} />

        <label>19. Should it support offline functionality?</label>
        <input name="offline" placeholder="Enter your answer" onChange={handleChange} value={formData.offline || ""} />
      </>,
      "Functionality & Features"
    ),
    5: withMinHeight(
      <>
        <label>20. Do you have a preferred technology stack?</label>
        <input name="techStack" placeholder="Enter your answer" onChange={handleChange} value={formData.techStack || ""} />

        <label>21. Will the app need a backend server or database?</label>
        <input name="backend" placeholder="Enter your answer" onChange={handleChange} value={formData.backend || ""} />

        <label>22. Do you need admin or analytics dashboards?</label>
        <input name="dashboard" placeholder="Enter your answer" onChange={handleChange} value={formData.dashboard || ""} />
      </>,
      "Technical Requirements"
    ),
    6: withMinHeight(
      <>
        <label>23. Will you need ongoing support and maintenance?</label>
        <input name="support" placeholder="Enter your answer" onChange={handleChange} value={formData.support || ""} />

        <label>24. How frequently do you plan to update the app?</label>
        <input name="updates" placeholder="Enter your answer" onChange={handleChange} value={formData.updates || ""} />

        <label>25. Do you need help with app store submission and updates?</label>
        <input name="storeHelp" placeholder="Enter your answer" onChange={handleChange} value={formData.storeHelp || ""} />
      </>,
      "Maintenance & Updates"
    ),
    7: withMinHeight(
      <>
        <label>26. Do you have a marketing plan for the app launch?</label>
        <textarea name="marketing" placeholder="Enter your answer" onChange={handleChange} value={formData.marketing || ""} />

        <label>27. Will you need help with ASO (App Store Optimization)?</label>
        <input name="aso" placeholder="Enter your answer" onChange={handleChange} value={formData.aso || ""} />

        <label>28. Are there any promotional materials or campaigns planned?</label>
        <input name="campaigns" placeholder="Enter your answer" onChange={handleChange} value={formData.campaigns || ""} />
      </>,
      "Marketing & Launch"
    ),
    8: (
      <div className="form-page">
        <h3 className="form-heading">Additional Information</h3>

        <label>29. Any other information?</label>
        <textarea name="extra" placeholder="Enter your answer" onChange={handleChange} value={formData.extra || ""} style={{ minHeight: 140 }} />

        <div className="ack-box ack-inline">
          <label className="ack-label">
            <input type="checkbox" checked={ackChecked} onChange={(e) => setAckChecked(e.target.checked)} />
            <div className="ack-text">
              <strong>By submitting, I acknowledge:</strong>
              <div>I agree that the AK Technologies team may contact me regarding this submission. I understand my data will be used to provide a quote or follow up on this request.</div>
            </div>
          </label>
        </div>

        <div style={{ marginTop: 18 }}>
          <button type="submit" className="submit-btn submit-btn-inline">Submit</button>
        </div>
      </div>
    ),
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <form onSubmit={handleSubmit}>
          {pages[step]}
          <div className="form-navigation">
            {step > 1 && (<button type="button" className="nav-btn back" onClick={handleBack}>Back</button>)}
            {step < 8 && (<button type="button" className="nav-btn next" onClick={handleNext}>Next</button>)}
            <span className="step-indicator">Step {step} / 8</span>
          </div>
        </form>
      </div>
    </div>
  );
};
// --- END original MultiStepForm ---

/* ---------------- ServiceCard ---------------- */
const ServiceCard = ({ id, title, img, description, onConnect, openCardId, setOpenCardId }) => {
  const isOpen = openCardId === id;

  const handleToggle = (e) => {
    // Prevent clicks on inner interactive elements from double-handling
    if (e && e.target && (e.target.tagName === "A" || e.target.tagName === "BUTTON" || e.target.closest(".submit-btn"))) {
      return;
    }
    if (isOpen) {
      setOpenCardId(null);
    } else {
      setOpenCardId(id);
    }
  };

  return (
    <motion.div
      className={`service-card ${isOpen ? "is-open" : ""}`}
      whileHover={{ scale: 1.03 }}
      ref={null}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle(e);
        }
        if (e.key === "Escape") {
          setOpenCardId(null);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isOpen}
    >
      <div className="service-card-image" aria-hidden={isOpen ? "false" : "true"}>
        <img src={img} alt={title} />
        <div className="service-card-gradient" />
        <div className="service-card-title-container">
          <h3 className="service-title">{title}</h3>
        </div>
      </div>

      <motion.div
        className="service-hover-content"
        whileHover={{ opacity: 1 }}
        style={{ pointerEvents: isOpen ? "auto" : undefined }}
        onClick={(e) => {
          // Clicking inside overlay should not propagate to parent's toggle handler (so users can tap links/buttons)
          e.stopPropagation();
        }}
      >
        <h3>{title}</h3>
        <p>{description}</p>
        {/* Keep the original onConnect button behavior if present */}
        
      </motion.div>
    </motion.div>
  );
};

/* ---------------- Main Page ---------------- */
const ServicesPage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // openCardId holds index-based id of open card, or null
  const [openCardId, setOpenCardId] = useState(null);

  const gridRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Click outside to close any open card
  useEffect(() => {
    const onDocClick = (evt) => {
      const grid = gridRef.current;
      if (!grid) return;
      if (!grid.contains(evt.target)) {
        setOpenCardId(null);
      } else {
        // clicking inside grid — if the clicked element is not inside any .service-card,
        // close open card (covers the case where you click gap/center area)
        const card = evt.target.closest(".service-card");
        if (!card) setOpenCardId(null);
      }
    };

    document.addEventListener("click", onDocClick, { passive: true });
    // also close on ESC globally
    const onKey = (e) => {
      if (e.key === "Escape") setOpenCardId(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <Helmet>
        <title>Our Tech</title>
        <link rel="canonical" href="https://www.ak-consultants.in/ourtech.html" />
      </Helmet>

      <div className="services-container" data-aos="fade-up">
        <h2 className="main-heading" data-aos="fade-up">Our Tech</h2>
        <p className="main-description" data-aos="fade-up" style={{ color: "black" }}>
          We leverage next-generation technologies to solve real-world challenges and create impactful solutions.
        </p>

        <div className="card-grid" data-aos="fade-up" ref={gridRef}>
          <div className="card-row">
            <ServiceCard id={0} {...services[0]} onConnect={() => { setShowForm(true); }} openCardId={openCardId} setOpenCardId={setOpenCardId} />
            <ServiceCard id={1} {...services[1]} openCardId={openCardId} setOpenCardId={setOpenCardId} />
          </div>

          <div className="card-row">
            <ServiceCard id={2} {...services[2]} openCardId={openCardId} setOpenCardId={setOpenCardId} />
            <ServiceCard id={3} {...services[3]} openCardId={openCardId} setOpenCardId={setOpenCardId} />
          </div>

          <div className="card-row single">
            <ServiceCard id={4} {...services[4]} openCardId={openCardId} setOpenCardId={setOpenCardId} />
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>↑</button>
      )}

      {showForm && <MultiStepForm onClose={() => setShowForm(false)} />}

      <div id="footer" className="footer">
        <div className="container text-center">
          <p>&copy; 2025 AK Technologies Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
