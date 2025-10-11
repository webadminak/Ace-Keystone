import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import "./careers.css";
import bannerImage from "../img/img3.jpg";
import { Helmet } from "react-helmet";


const positions = [
    {
        id: "medical-intern",
        title: "Student Intern (Medical)",
        location: "Coimbatore",
        type: "Intern",
        department: "Electronics",
        experience: "Final Year Students",
        description: "Work on cutting-edge digital platforms and scalable systems...",
    },
    {
        id: "electronics-engineer",
        title: "Electronic Design Engineer",
        location: "Coimbatore",
        type: "Intern",
        department: "Electronics",
        experience: "0 - 6 months",
        description: "Involves the end-to-end development of electronic systems, with a...",
    },
    {
        id: "fsd-intern",
        title: "Full-Stack Developer Intern",
        location: "Coimbatore",
        type: "Intern",
        department: "Software",
        experience: "0 - 6 months",
        description: "Collaborate with senior developers to write efficient, and reusable code...",
    },
    {
        id: "ml-intern",
        title: "ML Engineer Intern",
        location: "Coimbatore",
        type: "Intern",
        department: "Software",
        experience: "0 - 6 months",
        description: "Assist in designing and developing backend services and APIs for...",
    },
    {
        id: "data-admin",
        title: "Data Administrator",
        location: "Coimbatore",
        type: "Full-time",
        department: "Software",
        experience: "0 - 6 months",
        description: "Working on Data Administration roles such as Data Accuracy, Reporting...",
    },
];

const Careers = () => {
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

    const navigate = useNavigate();

    const handleContactClick = () => {
        navigate('/contact');
    };

    const handleCardClick = (id) => {
        sessionStorage.setItem("scrollPosition", window.scrollY);
        navigate(`/careers/${id}`);
    };

    useEffect(() => {
        const scrollPosition = sessionStorage.getItem("scrollPosition");
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition, 10));
            sessionStorage.removeItem("scrollPosition");
        }
    }, []);
    useEffect(() => {
        AOS.init({
            duration: 1500, // Animation duration in ms
            once: true,     // Only animate once
        });
    }, []);


    return (
        <>
            <Helmet>
                <title>Careers</title>
                <link rel="canonical" href="https://www.ak-consultants.in/careers.html" />
            </Helmet>
            <div className="careers-container">
                <div className="careers-banner" data-aos="fade-up">
                    <img src={bannerImage} alt="Careers at AK Consultants" />
                    <div className="banner-title">Careers</div>
                </div>

                <section className="why-join" data-aos="fade-up">
                    <h2>Why Join Us</h2>
                    <p>
                        At AK Consultants, we’re building smart, scalable software solutions that power real-world impact.
                        As a product and service-driven startup, we blend innovation, speed, and purpose to tackle complex challenges with clarity.
                        You'll work alongside bold thinkers, passionate builders, and a team that turns great ideas into world-class platforms.
                        We foster ownership, creativity, and a growth mindset — because your voice and vision matter here.
                    </p>
                </section>

                <section className="open-positions-section" data-aos="fade-up">
                    <div className="open-positions-container" >
                        <h2>Open Positions</h2>

                        {/* INLINE FLEX GRID - centers last row and keeps 3 per row visually */}
                        <div
                            className="positions-list jobs-grid"
                            data-aos="fade-up"
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",   // centers items and the last row
                                gap: "28px",
                                maxWidth: "1160px",         // constrain so visually only 3 fit per row
                                margin: "0 auto",
                                padding: "0 12px",
                                boxSizing: "border-box"
                            }}
                        >
                            {positions.map((job) => (
                                <div
                                    className="job-card"
                                    key={job.id}
                                    onClick={() => handleCardClick(job.id)}
                                    style={{
                                        flex: "0 0 360px",     // fixed base width (prevents stretching)
                                        maxWidth: "360px",
                                        width: "100%",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <div className="job-header">
                                        <h3>{job.title}</h3>
                                        <span className="badge">{job.type}</span>
                                    </div>
                                    <div className="job-meta">
                                        <span><strong>Department:</strong> {job.department}</span>
                                        <span><strong>Experience:</strong> {job.experience}</span>
                                        <span><strong>Location:</strong> {job.location}</span>
                                        <p>{job.description}</p>
                                    </div>
                                    <span className="apply-button">See Details</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="benefits" data-aos="fade-up">
                    <h2>Perks & Benefits</h2>
                    <ul className="benefit-grid" data-aos="fade-up">
                        <li><i className="fa-solid fa-heart-pulse"></i> Health & Wellness Programs</li>
                        <li><i className="fa-solid fa-clock"></i> Flexible Work Arrangements</li>
                        <li><i className="fa-solid fa-graduation-cap"></i> Learning & Development Support</li>
                        <li><i className="fa-solid fa-user-group"></i> Inclusive & Collaborative Culture</li>
                        <li><i className="fa-solid fa-money-bill-wave"></i> Stock Options & Bonuses</li>
                        <li><i className="fa-solid fa-lightbulb"></i> Innovation-Driven Projects</li>
                        <li><i className="fa-solid fa-handshake-angle"></i> Mentorship & Career Guidance</li>
                        <li><i className="fa-solid fa-building"></i> Modern & Well-Equipped Workspace</li>
                    </ul>
                </section>

                <section className="cta-section" data-aos="fade-up">
                    <h2>Ready to Make an Impact?</h2>
                    <p>We’re always looking for passionate individuals. Even if you don’t see a role that fits, drop us a line.</p>
                    <button className="contact-btn" onClick={handleContactClick} data-aos="fade-up">Get in Touch</button>
                </section>

                <footer className="footer">
                    <div className="container text-center">
                        <p>&copy; 2025 AK Consultants Pvt. Ltd. All rights reserved.</p>
                    </div>
                </footer>
                {showScrollTop && (
                    <button className="scroll-to-top" onClick={scrollToTop}>
                        <i className="fa fa-arrow-up" style={{ position: 'relative', right: '1.5px' }}></i>
                    </button>
                )}
            </div>
        </>
    );
};

export default Careers;
