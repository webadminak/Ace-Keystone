import React, { useState } from "react";
import "./medical.css";
import bannerImage from "../img/img1.jpg";

const accordionData = [
    {
        title: "Smart Implants",
        content: `We develop novel implants embedded with sensing, diagnostics, and therapeutic functions to enable continuous patient monitoring, early intervention, and better long-term outcomes.`,
    },
    {
        title: "Robotics & Visualization",
        content: `Our platforms integrate robotics, computer vision, and advanced visualization to assist surgeons with greater precision and enhanced decision-making during procedures.`,
    },
    {
        title: "Digital Surgery",
        content: `Digital Surgery can dramatically improve the standard of operative care for patients worldwide. We develop digital surgery platforms and ecosystems that augment surgeon decision-making, reduce outcomes variability, and increase procedural efficiency to improve the standard of patient care. 

We architect high value digital surgery platforms by combing deep expertise in robotics, advanced visualization, sensing, optics, artificial intelligence and machine learning, augmented reality, human factors, human machine understanding, wireless connectivity, digital service design, and business model transformation.`,
    },
    {
        title: "Critical Care",
        content: `We provide integrated monitoring and intervention platforms for critically ill patients, ensuring timely care decisions and improved survival outcomes.`,
    },
    {
        title: "Telemedicine Solutions",
        content: `Our telemedicine platforms bridge the gap in access to care, connecting patients and providers seamlessly across geographical boundaries.`,
    },
];

const Medical = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="medical-container">
            <div className="banner">
                <img src={bannerImage} alt="Medical Banner" className="banner-image" />
                <div className="banner-title">Medical devices</div>
                <div className="banner-shape" />
            </div>

            <div className="accordion-container">
                <h2 className="accordion-title">
                    <strong>What</strong> we do
                </h2>
                <p className="accordion-subtext">
                    We tackle the world’s toughest healthcare challenges, developing novel products, platforms and ecosystems to improve outcomes, care delivery, patient experience, and healthcare value. We have deep experience developing medical devices across a range of clinical applications.
                </p>

                {accordionData.map((item, index) => (
                    <div className="accordion-item" key={index}>
                        <div
                            className="accordion-header"
                            onClick={() => toggleAccordion(index)}
                        >
                            <div className={`arrow-icon ${activeIndex === index ? "open" : ""}`}>
                                {activeIndex === index ? "▾" : "▸"}
                            </div>
                            <h3>{item.title}</h3>
                        </div>

                        <div
                            className={`accordion-content ${activeIndex === index ? "open" : ""}`}
                        >
                            <p>{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>



            {/* Footer Section */}
            <div id="footer" style={{ backgroundColor: '#0F1035', color: 'white', padding: '40px', marginTop: '100px', width: '100%', bottom: '-20px' }}>
                <div className="container text-center">
                    <p>&copy; 2024 AK Technologies Pvt. Ltd. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Medical;
