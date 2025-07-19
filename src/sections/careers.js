import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import "./careers.css";
import bannerImage from "../img/img3.jpg";
import { Helmet } from "react-helmet";


const positions = [
    {
        id: "ux-ui-designer",
        title: "UX/UI Designer",
        location: "Coimbatore",
        type: "Full-time",
        department: "Software",
        experience: "0 - 6 months",
        description: "Design intuitive interfaces and seamless experiences for users...",
        detailed: "This is a detailed job description for UX/UI Designer including visual design, user research, and tools experience."
    },
    {
        id: "graduate-intern",
        title: "Graduate Intern",
        location: "Coimbatore",
        type: "Intern",
        department: "Innovation",
        experience: "Recent Graduate",
        description: "Work on cross-functional teams to build software solutions...",
        detailed: "This is a detailed job description for Software Engineer including responsibilities, qualifications, and expectations."
    },

    {
        id: "student-intern",
        title: "Student Intern",
        location: "Coimbatore",
        type: "Intern",
        department: "Innovation",
        experience: "Final-Year Students",
        description: "Need people who are motivated to work on Medical devices..",
        detailed: "This is a detailed job description for Product Manager including stakeholder coordination and product strategy."
    },
    {
        id: "medical-intern",
        title: "Student Intern (Medical)",
        location: "Coimbatore",
        type: "Intern",
        department: "Electronics",
        experience: "Final Year Students",
        description: "Work on cutting-edge digital platforms and scalable systems...",
        detailed: "This is a detailed job description for Product Manager including stakeholder coordination and product strategy."
    },
    {
        id: "ml-engnr",
        title: "ML Engineer",
        location: "Coimbatore",
        type: "Full-time",
        department: "Software",
        experience: "0 - 6 months",
        description: "Work on cutting-edge digital platforms and scalable systems...",
        detailed: "This is a detailed job description for Product Manager including stakeholder coordination and product strategy."
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
                <link rel="canonical" href="https://www.ak-tech.in/careers" />
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
                        <div className="positions-list" data-aos="fade-up">
                            {positions.map((job) => (
                                <div className="job-card" key={job.id} onClick={() => handleCardClick(job.id)}>
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
