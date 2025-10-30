import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import "./jobdetail.css";

const jobData = {

    "medical-intern": {
        title: "Medical Device Student Intern",
        location: "Coimbatore",
        posted: "19 July 2025",
        type: "Intern",
        level: "0 - 6 Months",
        description: `We are seeking a curious, detail‑oriented Medical Device Intern to support the end‑to‑end design and development of innovative healthcare products. This structured 3–6 month internship (with potential conversion to a full‑time role based on performance) will immerse you in real project cycles, design inputs, prototyping, verification, quality, and early regulatory considerations.

                    Key Impact & Responsibilities:

                    • Contribute to concept generation, CAD modeling, basic tolerance/fit checks, and design refinement.
                    • Assist in building rapid and functional prototypes (3D printing, basic machining, breadboards, test jigs).
                    • Execute bench tests: draft simple test protocols, capture raw data, perform first‑pass analysis, and summarize findings.
                    • Help maintain design history elements: design input matrices, risk logs (ISO 14971 mindset), revision tracking.
                    • Support basic Failure Mode & Effects Analysis (FMEA) sessions and preliminary risk mitigations.
                    • Coordinate with cross‑functional team members (R&D, quality, electronics, firmware, clinical advisors) to push iterative improvements.
                    • Document work clearly lab notebooks, test reports, change summaries to ensure traceability and audit readiness.
                    • Assist in vendor communication for components / fabrication quotes and evaluate sample parts for conformity.
                    • Learn fundamentals of applicable standards (biocompatibility basics, IEC safety concepts) under supervision.
                    • Participate in internal design reviews: prepare slide snapshots of progress, data, and next steps.

                    What You’ll Learn / Exposure:

                    • Medical device development lifecycle (concept → prototype → verification readiness).
                    • Practical application of risk management, design control documentation, and basic regulatory pathways.
                    • Interpreting test data to inform design pivots.
                    • Collaborative engineering workflows using version control (Git) and structured filing.
                    • Professional communication in multidisciplinary technical contexts.
                    `
    },

    "electronics-engineer": {
        title: "Electronic Design Engineer – Medical Devices",
        location: "Coimbatore",
        posted: "19 July 2025",
        type: "Intern",

        level: "0 - 6 Months",
        description: `This role involves the end-to-end development of electronic systems, with a particular focus on designing high-performance sensors and circuits for medical applications. You will contribute to the creation of innovative, reliable, and manufacturable hardware solutions, collaborating closely with cross-functional teams including firmware, mechanical, and product development engineers.                    
                    
                    Key Responsibilities:
                            
                            - Design and develop analog and digital electronic circuits and systems.
                            - Create schematics and PCB layouts using industry-standard tools (e.g., Altium, Eagle, KiCAD).
                            - Perform simulations, prototyping, and testing of electronic hardware.
                            - Collaborate with firmware, mechanical, and manufacturing teams to ensure seamless integration.
                            - Conduct design reviews and ensure compliance with relevant standards and regulations.
                            - Troubleshoot and resolve design and production issues.
                                                
                    Qualifications:

                            - Bachelor’s or Master’s degree in Electronics Engineering, Electrical Engineering, or a related field.
                            - Proven experience in electronic circuit design and PCB layout.
                            - Strong understanding of embedded systems, microcontrollers, and communication protocols (e.g., SPI, I2C, UART).
                            - Familiarity with EMC/EMI considerations and design for manufacturability.
                            - Proficiency in using lab equipment such as oscilloscopes, logic analyzers, and multimeters.
                            - Excellent problem-solving skills and attention to detail.
                    
                    Preferred Skills:

                            - Microcontroller/ FPGA (VHDL/Verilog) based system development.
                            - Familiarity with regulatory standards 
                            - Understanding of sensor integration and interfacing with various sensor types (e.g., temperature, pressure, motion, optical).
                            - Understanding of system integration and the ability to work across hardware, firmware, and software domains.
                    `,
    },
    "ml-intern": {
        title: "Machine Learning Engineer Intern",
        location: "Coimbatore",
        posted: "09 Sept 2025",
        type: "Intern",
        level: "0 - 6 Months",
        description: `We are looking for a motivated Backend Engineer Intern to join our engineering team. In this role, you will gain hands-on experience in building and scaling backend services that power production APIs for fine-tuned LLMs/ML models, workload management systems, and ERP modules. You’ll also get exposure to cloud-native platforms (GCP, Azure), microservices architecture, and modern observability tools (Grafana, Prometheus). Outstanding interns will have the opportunity to convert into a full-time Backend Engineer. 
                    Shape 

                Responsibilities:

                    • Assist in designing and developing backend services and APIs for ML/LLM applications.
                    • Support the team in building microservices for workload management and ERP systems.  
                    • Learn and contribute to cloud deployments (GCP, Azure, NVIDIA NIM, etc.). 
                    • Participate in monitoring and observability setup using tools like Grafana, Prometheus, and ELK stack. 
                    • Work with senior engineers to integrate ML models into scalable production environments. 
                    • Write clean, maintainable, and testable code following best practices.
                    • Debug, test, and optimize backend components to improve system reliability and performance. 
                    

                Requirements:

                    • Pursuing or recently completed a degree in Computer Science, Software Engineering, or related field. 
                    • Strong fundamentals in programming (Python). 
                    • Understanding of databases (SQL/NoSQL) and API design (REST/GraphQL). 
                    • Basic knowledge of microservices and containerization (Docker, Kubernetes).
                    • Familiarity with cloud concepts (GCP/Azure).
                    • Eagerness to learn modern backend technologies for scalable ML/LLM systems. 
                    • Strong problem-solving ability and willingness to work in a collaborative team. 
                    

                Preferred(Good to Have): 

                    • Exposure to ML model serving frameworks (FastAPI, Flask, TorchServe, NVIDIA NIM).  
                    • Experience with workload orchestration tools (Airflow, Celery, Kafka, etc.).. 
                    • Understanding of monitoring and logging tools (Grafana, Prometheus). 
                    • Knowledge of ERP workflows or enterprise software systems. 
                    • Hands-on with Git, CI/CD pipelines, and automated testing.

                What We Offer:

                    • Real-world experience in building production-grade backend systems. 
                    • Mentorship from engineers working on ML, LLM, and microservices at scale. 
                    • Opportunity to learn cloud platforms and observability practices. 
                    • A clear career path with potential full-time conversion after internship.`
    },

    "fsd-intern": {
        title: "Full-Stack Developer Intern",
        location: "Coimbatore",
        posted: "10 Sept 2025",
        type: "Intern",
        level: "0 - 6 Months",
        description: `We are looking for a passionate and motivated Full Stack Developer Intern (MERN Stack) to join our team. This internship will provide hands-on experience in building scalable web applications using the latest technologies. You will work closely with our development team on real-world projects and gain exposure to the full software development lifecycle. 

                Responsibilities:

                    • Assist in designing, developing, and maintaining web applications using MERN stack (MongoDB, Express.js, React.js, Node.js).
                    • Collaborate with senior developers to write clean, efficient, and reusable code. 
                    • Work on both frontend (React.js) and backend (Node.js, Express.js) tasks. 
                    • Help in integrating RESTful APIs and third-party services.
                    • Debug, test, and document code to ensure quality and reliability. 
                    • Participate in team meetings, brainstorming sessions, and code reviews.
                    

                Requirements:

                    • Recent Graduate student (B.E, B.Sc, MCA, or equivalent) with a keen interest in full stack development. 
                    • Basic knowledge of JavaScript, HTML, CSS and understanding of React.js & Node.js. 
                    • Familiarity with databases (MongoDB / PostgreSQL preferred). 
                    • Understanding of Git/GitHub for version control.
                    • Good problem-solving and communication skills.
                    • Ability to learn quickly and work in a collaborative team environment.
                    

                Preferred(Good to Have): 

                    • Completion of any certification course or online training in MERN stack / Full Stack Development.  
                    • Experience working on personal or academic projects (GitHub portfolio is a plus). 
                    • Knowledge of deployment platforms (Netlify, Vercel, Azure, etc.). 

                Perks & Benefits:

                    • Hands-on experience with live projects
                    • Mentorship from experienced developers. 
                    • Internship certificate upon successful completion. 
                    • The possibility of full-time employment based on performance.

                 `
    },


    "data-admin": {
        title: "Data Administrator",
        location: "Coimbatore",
        posted: "15 Sept 2025",
        type: "Full-time",
        level: "0 - 6 Months",
        description: `We are looking for a Data Administrator to organize,
        maintain, and quality-check project data across our AI, analytics, and geospatial service lines.
        This role focuses on data accuracy, reporting, and clear documentation, with light exposure to GIS.
        If you enjoy working with data, creating well-structured reports, and supporting multiple teams, this position is for you. 

                Responsibilities:

                    • Collect, clean, and maintain project datasets (spreadsheets, reports, and basic spatial files).
                    • Perform regular data reviews and quality checks, ensuring consistency and completeness.
                    • Prepare summary reports, dashboards, and presentations for internal teams and clients. 
                    • Maintain clear documentation and metadata so that data can be reused and audited.
                    • Coordinate with project managers, analysts, and technical staff to understand data needs. 
                    • Provide basic support for GIS datasets (e.g., opening files in QGIS or verifying map outputs—training provided).
                    

                Qualifications:

                    • Bachelor’s degree in Data Science, Statistics, Computer Science, Geography, Environmental Studies, or any discipline with strong data/reporting coursework.
                    • Comfortable working with Excel/Google Sheets, databases, or simple data visualization tools. 
                    • Good analytical and comprehension skills—able to read reports, interpret findings, and spot inconsistencies.
                    • Interest in learning basic geospatial concepts (coordinate systems, map layers)—prior GIS experience is a plus but not required.
                    • Clear written and verbal communication skills for documenting and presenting data insights.
                

                 `
    },
};
const JobDetail = () => {
    const { jobId } = useParams();
    const job = jobData[jobId];
    const [showForm, setShowForm] = useState(false);
    const [hasExperience, setHasExperience] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowForm(false);
      
        const form = e.target;
      
        // Function to send to one access key
        const sendForm = async (accessKey) => {
          const fd = new FormData(form);
          fd.append("access_key", accessKey);
      
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: fd,
          });
          return response.json();
        };
      
        try {
          // Send to both access keys in parallel
          const [result1, result2] = await Promise.all([
            sendForm("04b0a93d-d63b-4ed6-85df-819555cc3844"),
            sendForm("ff1c17dd-8a36-465a-a352-b401b0599ae0"),
          ]);
      
          if (result1.success && result2.success) {
            Swal.fire("Submitted!", "We'll review your application shortly.", "success");
            form.reset();
          } else {
            Swal.fire("Error", "One of the submissions failed. Please try again later.", "error");
          }
        } catch (error) {
          console.error("Fetch error:", error);
          Swal.fire("Error", "Network error. Please try again later.", "error");
        }
      };
      

    useEffect(() => {
        if (showForm) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        // Optional cleanup (just in case)
        return () => document.body.classList.remove('no-scroll');
    }, [showForm]);

    if (!job) return <div>Job not found</div>;
    return (
        <>
            <div className="job-detail">
                <div className="hero-banner">
                    <h2>{job.location}</h2>
                    <h1>{job.title}</h1>
                    <button className="apply-btn1" onClick={() => setShowForm(true)}>Apply now →</button>
                </div>
                <div className="job-content">
                    <div className="job-description">
                        <h3>Job Description</h3>
                        <p>
                            {job.description.split('\n').map((line, index) => {
                                const boldHeadings = [
                                    "Key Impact & Responsibilities:",
                                    "What You’ll Learn / Exposure:",
                                    "Qualifications:",
                                    "Preferred Skills:",
                                    "Key Responsibilities:",
                                    "Responsibilities:",
                                    "Requirements:",
                                    "Preferred(Good to Have):",
                                    "Perks & Benefits:",
                                    "What We Offer:"

                                ];

                                const isHeading = boldHeadings.some(h => line.trim().startsWith(h));

                                return (
                                    <React.Fragment key={index}>
                                        {isHeading ? <strong>{line}</strong> : line}
                                        <br />
                                    </React.Fragment>
                                );
                            })}
                        </p>


                        <button className="apply-btn" onClick={() => setShowForm(true)}>Apply now →</button>
                    </div>
                    <div className="job-meta2">
                        <p style={{ color: "black" }}><strong>Posted on:</strong> {job.posted}</p>
                        <p style={{ color: "black" }}><strong>Experience:</strong> {job.level}</p>
                        <p style={{ color: "black" }}><strong>Contract type:</strong> {job.type}</p>
                        <p style={{ color: "black" }}><strong>Location:</strong> {job.location}</p>
                    </div>
                </div>
                {showForm && (
                    <div className="overlay-form" onClick={() => setShowForm(false)} >
                        <div className="form-container" onClick={(e) => e.stopPropagation()}>
                            <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
                            <h2>Employment Form</h2>
                            <form onSubmit={handleSubmit} method="POST">
                                <div>
                                    <label>First Name<span className="required-asterisk">*</span></label>
                                    <input type="text" name="first_name" placeholder="Ex:John" required />
                                </div>
                                <div>
                                    <label>Last Name<span className="required-asterisk">*</span></label>
                                    <input type="text" name="last_name" placeholder="Ex:Doe" required />
                                </div>
                                <div>
                                    <label>Location<span className="required-asterisk">*</span></label>
                                    <input type="text" name="location" placeholder="Ex:Bangalore" required />
                                </div>
                                <div>
                                    <label>Contact Number<span className="required-asterisk">*</span></label>
                                    <input type="text" name="contact_number" placeholder="Ex:+91 9876543210" required />
                                </div>
                                <div className="full-width">
                                    <label>Address<span className="required-asterisk">*</span></label>
                                    <textarea name="address" placeholder="Ex:123, Main Road, Indiranagar, Bangalore" required></textarea>
                                </div>
                                <div>
                                    <label>Date of Birth<span className="required-asterisk">*</span></label>
                                    <input type="date" name="dob" required />
                                </div>
                                <div>
                                    <label>College Name<span className="required-asterisk">*</span></label>
                                    <input type="text" name="college" placeholder="Ex:IIT Madras" required />
                                </div>
                                <div>
                                    <label>Course Name (Highest Qualification)<span className="required-asterisk">*</span></label>
                                    <input type="text" name="course" placeholder="Ex:B.Tech or BE" required />
                                </div>
                                <div>
                                    <label>Department</label>
                                    <input type="text" name="department" placeholder="Ex:Computer Science" required />
                                </div>
                                <div>
                                    <label>Email Address<span className="required-asterisk">*</span></label>
                                    <input type="email" name="email" placeholder="Ex:john.doe@example.com" required />
                                </div>
                                <div>
                                    <label>Previous Experience</label>
                                    <select name="experience" onChange={(e) => setHasExperience(e.target.value === "Yes")} required>
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                {hasExperience && (
                                    <>
                                        <div className="full-width">
                                            <label>About your work experience</label>
                                            <textarea name="work_experience" placeholder="Ex:Worked as a Frontend Developer at XYZ Corp for 2 years." required></textarea>
                                        </div>

                                    </>
                                )}
                                <div className="full-width">
                                    <label>Disability</label>
                                    <select name="disability" required>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        <option value="">I prefer not to disclose</option>
                                    </select>
                                    <small className="note">We respect and welcome diversity. This information will not be used for screening.</small>
                                </div>
                                <div className="full-width">
                                    <label>In approximately 250 words, please describe your motivation for applying to this position and explain how your background and values align with our organization.?<span className="required-asterisk">*</span></label>
                                    <textarea name="cover-letter" placeholder="Just be real, we’d rather hear from you than a bot!" required></textarea>
                                </div>
                                <div className="form-declaration full-width">
                                    <input type="checkbox" id="declaration" required />
                                    <label htmlFor="declaration">
                                        I hereby confirm that the above details are accurate and true to the best of my knowledge.
                                    </label>
                                </div>

                                <button type="submit" className="submit-btn">Submit Application</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <footer className="footer">
                <div className="container text-center">
                    <p>&copy; 2024 AK Consultants Pvt. Ltd. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default JobDetail;
