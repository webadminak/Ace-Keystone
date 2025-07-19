import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import "./jobdetail.css";

const jobData = {
    "graduate-intern": {
        title: "Graduate Intern",
        location: "Coimbatore",
        posted: "30 Apr 2025",
        type: "Intern",

        level: "Recent Graduate",
        description: `
                        We are hiring a Graduate Intern to support various departments across ongoing projects and initiatives. This is an ideal opportunity for recent graduates to gain real-world experience, develop industry-relevant skills, and work closely with experienced professionals in a dynamic environment. The role will involve research, documentation, project support, and coordination depending on the specific team's needs.
                        Key Responsibilities:
                        •	Assist in daily operations and project execution across teams
                        •	Conduct research, prepare reports, and support data analysis tasks
                        •	Collaborate with team members on assigned deliverables
                        •	Participate in meetings and contribute fresh ideas
                        •	Learn and apply relevant tools, software, or frameworks used by the team
                        Qualifications:
                        •	Recent graduate (Bachelor’s or Master’s) in any relevant field
                        •	Strong verbal and written communication skills
                        •	Proactive attitude with a willingness to learn
                        •	Good organizational and time-management skills
                        `,
    },
    "student-intern": {
        title: "Student Intern",
        location: "Coimbatore",
        posted: "30 Apr 2025",
        type: "Intern",

        level: "Final Year Students",
        description: `
                        We are looking for a Student Intern to join our team part-time or during academic breaks. This internship offers hands-on experience for current students to learn about professional environments, build foundational skills, and contribute meaningfully to real projects. You'll be working under supervision with the opportunity to grow and explore your interests.
                        Key Responsibilities:
                        •	Support team members with basic tasks, research, and documentation
                        •	Participate in training sessions and team meetings
                        •	Help in organizing and coordinating internal initiatives
                        •	Perform entry-level analysis or data handling based on team requirements
                        •	Engage in learning and development activities
                        Qualifications:
                        •	Currently enrolled in an undergraduate program
                        •	Good communication and interpersonal skills
                        •	Enthusiastic and curious mindset
                        •	Ability to manage time effectively and meet deadlines
                        •	Basic proficiency in tools/software relevant to your field of study
                        `,
    },
    "ux-ui-designer": {
        title: "UI/UX Designer",
        location: "Coimbatore",
        posted: "30 Apr 2025",
        type: "Contract",

        level: "0 - 6 Months",
        description: `
                        This is a full-time on-site role for a UI/UX Designer. As a UI/UX Designer, you will be responsible for conducting user research, applying design thinking methodologies, creating visual designs, prototyping, and implementing user-centered design solutions. You will collaborate with cross-functional teams to ensure the best user experience across different platforms and products.
                        Qualifications
                        •	User Research and Design Thinking skills
                        •	Proficiency in Visual Design and User Experience (UX) principles
                        •	Experience in prototyping and implementing user-centered design solutions
                        •	Strong problem-solving and analytical skills
                        •	Excellent communication and collaboration abilities
                        •	Attention to detail and ability to multitask
                        •	Experience with UX design tools and software
                        •	Knowledge of front-end development languages (HTML, CSS, JavaScript) is a plus
                        `,
    },


    "medical-intern": {
        title: "Medical Device Student Intern",
        location: "Coimbatore",
        posted: "30 Apr 2025",
        type: "Intern",

        level: "0 - 6 Months",
        description: `We’re seeking a passionate and driven intern to contribute to the design and development of innovative medical devices. This is a 3–6-month internship with the opportunity for a permanent position based on performance.
                        What You’ll Do:
                        •	Assist in the design, prototyping, and testing of medical devices.
                        •	Collaborate with cross-functional teams to advance projects.
                        •	Ensure compliance with regulatory and quality standards.
                        What We’re Looking For:
                        •	Pursuing or recently completed a degree in Biomedical, Mechanical, or Electrical Engineering (or related fields).
                        •	Strong analytical skills and a proactive mindset.
                        `,
    },
    "ml-engnr": {
        title: "Machine Learning Engineer",
        location: "Coimbatore",
        posted: "30 Apr 2025",
        type: "Full-time",

        level: "0 - 6 Months",
        description: `
 
                    This role involves end-to-end development of machine learning models, with a particular focus on LLM-based applications, including Retrieval-Augmented Generation (RAG) and model fine-tuning. You will work on building scalable AI/ML pipelines on modern cloud platforms, collaborating closely with data scientists, engineers, and product teams to deliver intelligent solutions.
                    
                    Responsibilities:
                    
                    Develop, fine-tune, and deploy machine learning and deep learning models, including large language models (LLMs).
                    Implement and optimize RAG pipelines for production-grade generative AI systems.
                    Build scalable, reliable ML infrastructure and workflows on cloud platforms such as AWS, GCP, or Azure.
                    Collaborate with cross-functional teams to integrate ML models into applications and services.
                    Monitor, evaluate, and improve model performance using real-world data and feedback.
                    Stay up to date with the latest advancements in generative AI, NLP, and MLOps best practices.
                    
                    Requirements:
                    
                    Bachelor’s or Master’s degree in Computer Science, Machine Learning, or a related field.
                    Proficient in Python and familiar with ML libraries like PyTorch, TensorFlow, Hugging Face Transformers.
                    Hands-on experience with fine-tuning LLMs and implementing RAG architectures.
                    Strong understanding of data structures, algorithms, and ML system design.
                    Experience with cloud-based ML services (e.g., AWS SageMaker, GCP Vertex AI, Azure ML).
                    Familiarity with MLOps tools (e.g., MLflow, Airflow, Weights & Biases) and containerization (Docker, Kubernetes).
                    `,
    },

};

const JobDetail = () => {
    const { jobId } = useParams();
    const job = jobData[jobId];
    const [showForm, setShowForm] = useState(false);
    const [hasExperience, setHasExperience] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowForm(false); // Hide the form immediately
      
        const form = e.target;
        const formData = new FormData(form);
      
        // Append your Web3Forms access key
        formData.append("access_key", "04b0a93d-d63b-4ed6-85df-819555cc3844");
      
        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
          });
          const result = await response.json();
      
          if (result.success) {
            Swal.fire("Submitted!", "We'll review your application shortly.", "success");
            form.reset(); // Clear the form
          } else {
            console.error("Submission error:", result);
            Swal.fire("Error", "Form submission failed. Please try again later.", "error");
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
                            {job.description.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
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
