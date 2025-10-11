import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaUsers, FaBriefcase, FaGraduationCap, FaLinkedin } from "react-icons/fa";
import backgroundImage from '../img/9019808.jpg'; // Change path accordingly
import styles from './Team.module.css'

import abinayaImage from '../img/AbiSowri_photo_1-removebg-preview (1).png';
import sowriraghavan from '../img/sowriraghavan-removebg-preview.png'
import vaishnaviImage from '../img/vyshu_-_final-removebg-preview.png';
import abishekImage from '../img/Abishek-photo-removebg-preview.png';
import pachamuthuImage from '../img/Green-removebg.png';
import semilImage from '../img/Semil-photo-removebg-preview.png';
import krishnan from '../img/krishnan.png';
import elango from '../img/Elango.png';
import gayathri from '../img/gayathri.png';
import sonia from '../img/Sonia Reynolds — ZEPHLINEAR.jpg'
import amin from '../img/Al-Amin Dabo.jpg'
import surrendar from '../img/surrendar.png';
import philip from '../img/Phillip.jpeg'
import jim from '../img/jim.png';
import ibukan from '../img/ibukan.png'
import Sathyapriya from '../img/Sathyapriya-removebg-preview.png';
import Maria from '../img/Maria_Anto_Benita_-_pic-removebg-preview.png'
import priyaImage from '../img/priya-img-removebg-preview.png'
import charanimage from '../img/charan-img.png'
import surendherimage from '../img/surendher-removebg-preview.png'
import ibrahim from "../img/ibrahim-removebg-preview (1).png"
import abdul from "../img/abdul-removebg-preview.png";
import karthik from "../img/karthik-removebg-preview.png";
import kiruthika from "../img/Kiruthika.png";
import harita from "../img/Harita_OG.png"
import ranjini from "../img/ranjini.png"
import sakthi from "../img/sakthi.png"
import { Helmet } from "react-helmet";


const teamData = {
  "Core Team": [


    { heading: "ThinkForge" },
    {
      name: "Dr. Karthik Thangaraj",
      role: "Head of Innovations",
      description: "Dr. Karthik Thangaraj is a seasoned innovation leader with over 15 years of experience driving digital transformation across the energy, infrastructure, and transport sectors. His strategic leadership has secured multiple government-funded initiatives aimed at enhancing operational efficiency and sustainability. Holding a PhD in Electrical Engineering from Cardiff University in collaboration with Airbus Innovations in Munich, this work contributed to advancements in thermoelectric energy harvesting-powered autonomous sensors. During his MSc at the University of Wales, he completed a research internship with Airbus UK, studying the effects of atmospheric turbulence on laser-based satellite communication systems.​",
      linkedin: "https://www.linkedin.com/in/kthangaraj/",
      image: karthik
    },
    
    { heading: "The Design Bench" },
    {
      name: "Sri Ranjini Kumar",
      role: "Embedded Systems Specialist",
      description: "Sri Ranjini brings a strong academic foundation with a Bachelor’s degree in Electronics and Communication Engineering and a Master’s degree in Embedded Systems. She has a keen interest in designing and optimizing embedded solutions, combining hardware and software expertise to create efficient, reliable systems. With a passion for technology and continuous learning, she contributes to innovative projects that integrate advanced electronics with practical applications. Sri Ranjini is dedicated to exploring emerging trends in IoT and automation to enhance system performance. With a passion for technology and continuous learning, she contributes to innovative projects that integrate advanced electronics with practical applications.",
      image: ranjini
    },
    {
      name: "Harita Muralikrishnan",
      role: "Electronics Design Engineer",
      description: "Our Electronics Design Engineer plays a vital role in driving healthcare innovation through advanced electronic system design. She specializes in developing precise, reliable, and efficient hardware solutions for medical devices and healthcare technology, ensuring compliance with industry standards and patient safety requirements. By combining technical precision with a passion for innovation, she consistently delivers designs that enhance medical device performance, support digital health advancements, and contribute to improving patient outcomes. Her expertise spans from concept development to final validation, enabling seamless integration of cutting-edge electronics into complex medical systems.",
      linkedin: "https://www.linkedin.com/in/harita-muralikrishnan/",
      image: harita
    },
    {
      name: "Kiruthika Prakash",
      role: "Medical Electronics Engineer",
      description: "Kiruthika Prakash is a Medical Electronics Engineer at AK Consultants, combining engineering expertise with a passion for healthcare innovation. She focuses on the design, testing, and validation of medical devices, ensuring safety, reliability, and compliance with regulatory standards. Skilled in biomedical systems and electronic design, she translates clinical requirements into practical, user-centered solutions. Dedicated to advancing medical technology, she works to improve patient care and bridge the gap between engineering and healthcare. She explores advancements in medical device technology and AI-driven diagnostics, while fostering collaboration to deliver solutions that empower both healthcare professionals and patients.",
      linkedin: "https://www.linkedin.com/in/kiruthika-prakash-029b2b24b/",
      image: kiruthika
    },
    {
      name: "Maria Anto Benita",
      role: "Student Intern",
      description: "Maria Anto Benita is an intern at AK Consultants, gaining practical experience in engineering and technology. She is eager to learn and develop her technical skills, focusing on problem-solving and system optimization. As part of her internship, she is involved in exploring innovative approaches to wireless communication and signal processing, contributing to research-driven advancements in the field. With a strong enthusiasm for emerging technologies, she actively engages in translating theoretical knowledge into practical applications. Her growing expertise positions her to contribute meaningfully to projects that enhance connectivity, efficiency, and technological innovation. She is also developing collaborative skills by working closely with experienced mentors.",
      image: Maria
    },
    {
      name: "Sathyapriya",
      role: "Student Intern",
      description: "Our intern Sathyapriya is passionate about expanding her technical knowledge and hands-on experience. She is focused on building a strong foundation in engineering concepts while contributing to ongoing research and development efforts. Her work includes exploring next-generation connectivity solutions, enhancing system efficiency, and addressing real-world challenges in wireless communication. She is eager to grow into a versatile engineer, combining innovation with practical application to make a meaningful impact in the field of technology. Through her internship, she is also developing valuable problem-solving and analytical skills, enabling her to approach complex challenges with confidence.",
      image: Sathyapriya
    },
    { heading: "Pertinent Minds" },
    {
      name: "Abinaya Sowriraghavan",
      role: "Head of AI & Data",
      description: "A results-driven technologist, she leads the Machine Learning and Data Science division at AK Consultants with a focus on solving complex challenges through intelligent systems. With deep expertise in AI, predictive analytics, and data-driven software solutions, she bridges cutting-edge research with impactful real-world applications. Her work supports clients across the UK and India, with recognition including the Birmingham City Council-funded Digital Challenge award for tech innovation. She is passionate about empowering women in technology, actively creating opportunities for them to lead and innovate in the fields of AI and data science. She is dedicated to fostering an inclusive environment where women can thrive, contribute meaningfully, and drive transformative advancements in machine learning.​ ​",
      linkedin: "https://www.linkedin.com/in/abinayasowriraghavan/?originalSubdomain=uk",
      image: abinayaImage
    },
    {
      name: "Semil Periyasamy",
      role: "Machine Learning Engineer",
      description: "Our Machine Learning Engineer is dedicated to developing AI solutions that address complex challenges and deliver impactful results. He designs, trains, and optimizes AI models, ensuring their effectiveness across various applications. Known for his innovative approach, he collaborates with senior engineers to implement advanced AI technologies and improve model performance. Passionate about staying ahead of trends, he actively documents processes, optimises AI systems, and shares knowledge with team members. He also contributes to the development of best practices, ensuring the scalability and sustainability of AI solutions, while helping drive continuous improvement within the organisation, innovating and collaborating to design scalable AI systems that deliver real impact.​",
      linkedin: "https://www.linkedin.com/in/semil-p/",
      image: semilImage
    },
    {
      name: "Sudhanthirapriya Sundaram",
      role: "Junior Machine Learning Engineer",
      description: "Our Junior Machine Learning Engineer is passionate about developing AI solutions that solve complex problems and drive meaningful impact. She designs, trains, and optimises machine learning models, ensuring their efficiency and accuracy across various applications. With a strong analytical mindset, she collaborates with senior engineers to implement advanced AI technologies and enhance model performance. Known for her curiosity and innovative approach, actively documents processes, and contributes to improving machine learning systems. Committed to professional growth, she shares her knowledge with team members and embraces new challenges, helping to drive continuous improvement within the organisation.​",
      linkedin: "https://www.linkedin.com/in/-sudhanthirapriya/",
      image: priyaImage
    },
    {
      name: "Abdul Nazeer",
      role: "Junior Machine Learning Engineer",
      description: "Abdul Nazeer M works as a Junior Machine Learning Engineer at AK Technologies, contributing to the development of data-driven solutions and intelligent systems. He has a solid foundation in algorithm design, model training, and data preprocessing, enabling him to support the creation of scalable ML pipelines. Proficient in Python and core machine learning frameworks, Abdul focuses on building accurate and efficient models that turn complex datasets into actionable insights. He is passionate about exploring new ML techniques and staying current with emerging technologies to enhance model performance. Abdul’s collaborative mindset and problem-solving skills help drive innovation across AI and data analytics projects, ensuring reliable and impactful outcomes for clients.",
      linkedin: "https://www.linkedin.com/in/abdul-nazeer-m-ba4111253/",
      image: abdul
    },
    { heading: "FusionFront" },
    {
      name: "Abishek Karunamoorthi",
      role: "Full Stack Developer",
      description: "Our Full Stack Developer brings extensive experience in designing and developing dynamic web applications, specialising in both front-end and back-end technologies. He plays a key role in enhancing the company’s digital presence and technical capabilities, creating high-quality, scalable solutions that drive digital transformation. Beyond core development, he is responsible for architecting and optimizing complex systems, ensuring seamless platform integration. His expertise in database management, server-side technologies, and cloud infrastructure ensures robust, secure applications. His innovative approach and technical proficiency consistently contribute to delivering reliable solutions, resulting in high client satisfaction and business growth.​ ​",
      linkedin: "https://www.linkedin.com/in/abishek-karunamoorthi/",
      image: abishekImage
    },
    {
      name: "Mohamed Ibrahim Afrith M",
      role: "Mobile App Developer",
      description: "Mohamed Ibrahim Afrith is a skilled mobile app developer specializing in Flutter for cross-platform application development. He focuses on building responsive, high-performance mobile applications with intuitive user experiences. With expertise in UI/UX design, API integration, and app optimization, he ensures that applications are both visually appealing and functionally robust. His attention to detail and commitment to best coding practices allow him to transform ideas into seamless, user-friendly mobile solutions that meet both client needs and business goals. He is passionate about exploring emerging mobile technologies to enhance development efficiency. Always eager to innovate, he thrives on creating scalable apps that adapt to evolving market demands.​",
      linkedin: "https://www.linkedin.com/in/mohamed-ibrahim-18afrith/",
      image: ibrahim
    },
    { heading: "DataCraft" },
    {
      name: "Lini Charan",
      role: "Team Lead, Data Administration",
      description: "Lini Charan leads the Data Administration team with expertise in geospatial services and data management. Skilled in QGIS and spatial data analysis, he oversees the organization, accuracy, and integrity of geospatial datasets while guiding his team in delivering high-quality solutions. His role involves streamlining workflows, ensuring compliance, and transforming complex spatial information into actionable insights. With a strategic approach and strong leadership, he empowers the team to provide reliable geospatial solutions that support informed, data-driven decision-making for clients and projects. Beyond his technical expertise, he fosters collaboration and mentorship, ensuring that every project is executed with precision and innovation​",
      linkedin: "https://www.linkedin.com/in/linicharan-shanmugavelusamy-140910192/",
      image: charanimage
    },
    {
      name: "Pachamuthu Vadivelmurugan",
      role: "Data Administrator",
      description: " Our Data Administrator is adept at organising, managing,and securing company data to ensure its accuracy, accessibility, and integrity. With expertise in database management, data governance, and security, he ensures the efficiency and reliability of the company’s information systems. His responsibilities include overseeing data storage, ensuring compliance with privacy regulations, and conducting audits to protect sensitive information. Skilled in QGIS, he designs and develops geospatial solutions tailored to client needs, translating complex spatial data into actionable insights. By delivering intuitive, user-friendly solutions, he empowers clients to make informed, data-driven decisions based on geographic information.​",
      linkedin: "https://www.linkedin.com/in/pachamuthu-vadivelmurugan-5a448117a/",
      image: pachamuthuImage
    },
    
    {
      name: "Surendher Kumar Murugan",
      role: "Data Administrator",
      description: "Surendher  brings expertise in geospatial data management and analysis, utilizing QGIS to develop precise and insightful spatial solutions. His role involves processing, organizing, and visualizing geographic data to enhance decision-making and operational efficiency. With a strong foundation in GIS mapping, spatial analysis, and data interpretation, he ensures the accuracy and reliability of geospatial datasets. His ability to transform raw spatial data into actionable insights enables businesses to optimize their strategies and make informed, location-based decisions.​",
      linkedin: "https://www.linkedin.com/in/surendher-kumar-murugan-847476270/",
      image: surendherimage
    },
    {
      name: "Sakthi Sundar",
      role: "Data Administrator",
      description: "Sakthi S manages and organizes company data to ensure its accuracy, security, and accessibility across all projects. With a strong understanding of database management and data governance, Sakthi streamlines workflows and maintains compliance with industry standards. Skilled in QGIS and geospatial analysis, Sakthi transforms complex spatial datasets into clear, actionable insights. By combining technical expertise with a detail-oriented approach, Sakthi supports reliable decision-making and enhances the efficiency of the organization’s information systems.​",
      linkedin: "https://www.linkedin.com/in/sakthi-s-86672133a/",
      image: sakthi
    },
    
    { heading: "WayFinders" },
    {
      name: "Sowriraghavan Aravamudhan",
      role: "Business Development Director",
      description: "Our Business Development Director brings over 40 years of extensive business expertise, mastering in broadcast solutions. A pioneer in advancing the broadcasting industry, he has earned multiple awards for his innovative contributions. His leadership, combined with deep technical knowledge and strategic vision, plays a key role in driving business growth. He supports the team in navigating challenges and making informed decisions, ensuring long-term success. With a focus on continuous improvement and industry leadership, his guidance shapes the company’s direction, promoting a culture of excellence and innovation across all operations.​​",
      linkedin: "https://www.linkedin.com/in/aravamudhan-sowriraghavan-3aa0a522/",
      image: sowriraghavan
    },
    {
      name: "Vaishnavi Balamurugan",
      role: "Project Manager",
      description: "Our Project Manager excels in leading projects from inception to completion with strategic oversight and precision. With a proven track record in managing cross-functional teams, she ensures that projects are delivered on time, within budget, and to the highest standards. Her commitment to excellence, strong leadership, and proactive problem-solving are key to the company’s success and client satisfaction. Known for navigating complex challenges with a clear focus on objectives, she consistently delivers high-quality results while exceeding client expectations. Her ability to drive efficiency and maintain seamless project execution makes her a vital contributor to the company’s growth and success.​ ",
      linkedin: "https://www.linkedin.com/in/vaishnavi-balamurugan/",
      image: vaishnaviImage
    },
  ],
  "Consultants": [
    {
      name: "Elango Nagasundaram",
      role: "Researcher in Millimetre Wave Communication​",
      description: "Lecturer at the University of South Wales, specializing in mm-wave and terahertz secure communication. His research covers radio propagation, satellite communication, antenna design, and CubeSats. He manages USW’s satellite ground station and serves on the IET Wales Southeast committee. With 15 years as an RF engineer and consultant, he bridges academia and industry.​",
      image: elango
    },
    {
      name: "Dr Sonia Reynolds",
      role: "Founder, Zephlinear, UK",
      description: "The inventor of FOYSE technology. Dr. Reynolds' expertise in textile innovation will be pivotal in driving the technological breakthroughs required for the project. FOYSE technology (Fibre On Yarn Surface Entanglement), which introduces a non-traditional manufacturing process for textiles. This technology, embedded with conductive yarns, will allow for the creation of a sustainable and high-functioning smart textile material.",
      image: sonia
    },
    {
      name: "Dr Krishnan G Venkateswaran MIET",
      role: "System Integration Engineer",
      description: "Krishnan specializes in railway signaling and simulation, supporting RAIB, Network Rail, and CAF in digital system integration. His projects include developing a continuous train protection system and feasibility studies on cost-effective ETCS Level 2 units. He focuses on reducing costs and risks in ERTMS implementation, enhancing railway safety and efficiency.​",
      image: krishnan
    },
    {
      name: "Dr Al-Amin Dabo",
      role: "Senior Lecturer in Logistics and Supply Chain Management",
      description: "He is a highly skilled and experienced professional in the field of supply chain management with a focus on sustainability and digital innovation. He holds a Doctor of Philosophy in Supply Chain Management from the University of Central Lancashire, where his research was funded by the Petroleum Technology Development Fund (PTDF).",
      image: amin
    },
    {
      name: "Dr Surender Subburaj",
      role: "Technical Consultant - Semiconductor Devices",
      description: "Surender is a Research Associate at Cardiff University’s Centre for High Frequency Engineering. He specializes in fast-switching cubic Gallium Nitride (GaN) micro-LED technology.  With expertise in semiconductor materials, he advances high-frequency engineering research. His work contributes to innovations in optoelectronic and high-frequency applications.",
      image: surrendar
    },
    {
      name: "Dr Jim Thorpe",
      role: "Electronics, RF and Semiconductor Device Engineer​",
      description: "I am a PhD qualified engineer with over 30 years of experience in electronics, radio-frequency and semiconductor device engineering in both industry and academia. Since 2012 I have worked as an engineering(Microelectronics, RF/Microwave, Electronics & Embedded Circuits and Mechanical Design ) consultant providing services in the UK, EU and also further afield.",
      image: jim
    },
    {
      name: "Dr. Ibukun Oladunjoye, MIET",
      role: "Researcher in Non - Linear Dynamics and Control Systems",
      description: "With over six years of engineering experience, I specialize in mathematical modeling, nonlinear dynamics, and systems engineering. I also have expertise in business management, negotiations, and strategic planning.  My skills help identify and develop new opportunities, partnerships, and collaborations.  I aim to deliver sustainable, innovative solutions for a low-carbon future. He drives innovation through sustainable and impactful engineering solutions.",
      image: ibukan
    },
    {
      name: "Phillip Bouwman",
      role: "Business Advisor",
      description: "He is an experienced consultant advising startups and SMEs on technology, R&D, funding, and commercialization. With a proven track record in business ownership, operations, and successful exits, he facilitates strategic market entry while mitigating risks.  His expertise includes go-to-market strategies, exit planning, and business development. Trusted by investment firms, boards, and industry professionals, he fosters successful and sustainable growth.",
      image: philip
    },
    {
      name: "Gayathri Ravichandran",
      role: "Landscape Architect",
      description: "Gayathri is an innovative Landscape Architect and Consultant specializing in sustainable and functional outdoor spaces. She integrates natural elements into urban environments to enhance community well-being and aesthetics. Skilled in site planning, ecological design, and project management, she leverages digital innovations for optimal outcomes. Committed to environmental stewardship, she delivers visually compelling, sustainable, and practical design solutions.​",
      image: gayathri
    },
  ],
 
};
const tabIcons = {
  "Core Team": <FaUsers style={{ marginRight: "8px", top: "4px", position: "relative" }} />,
  "Consultants": <FaBriefcase style={{ marginRight: "8px", top: "4px", position: "relative" }} />,
  "Interns": <FaGraduationCap style={{ marginRight: "8px", top: "4px", position: "relative" }} />
};

export default function TeamSection() {
  const [selectedTab, setSelectedTab] = useState("Core Team");
  const [isScrolling, setIsScrolling] = useState(false);
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
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    // slight delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      AOS.refresh(); // or AOS.refreshHard();
    }, 50);
    return () => clearTimeout(timeout);
  }, [selectedTab]);





  useEffect(() => {
    let timer;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsScrolling(false);
      }, 200); // Delay before showing again
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Team</title>
        <link rel="canonical" href="https://www.ak-consultants.in/teams.html" />
      </Helmet>

      <div className={`team-section ${isScrolling ? "hidden-content" : ""}`}>
        <div className={styles["teams-Container"]}
          style={{
            backgroundImage: `url(${backgroundImage})`,

          }}
        >
          <div className={styles["team-Content"]} data-aos="fade-up">
            <div className={styles["team-Tabs"]} data-aos="fade-up">
              {Object.keys(teamData).map((tab) => (
                <button className={styles["teams-TabButton"]}
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  style={{
                    padding: "10px 20px",
                    margin: "5px",
                    cursor: "pointer",
                    backgroundColor: selectedTab === tab ? "#007bff" : "#ddd",
                    color: selectedTab === tab ? "white" : "black",
                    border: "none",
                    borderRadius: "25px",
                    fontWeight: "500"
                  }}
                >
                  {tabIcons[tab]} {tab}
                </button>
              ))}
            </div>
            <div className={styles.teamContainer} key={selectedTab}>
              {teamData[selectedTab].map((member, index) =>
                member.heading ? (
                  <h2 key={`heading-${index}`} className={styles.teamHeading}>
                    {member.heading}
                  </h2>
                ) : (
                  <div
                    key={`card-${index}`}
                    className={`${styles.memberCard} ${selectedTab === "Consultants" || selectedTab === "Interns" ? styles.smallCard : ""}`}
                    data-aos="fade-up"
                  >

                    <img src={member.image} alt={member.name} className={styles.memberImage} />
                    <h3 className={styles.name}>{member.name}</h3>
                    <p className={styles.role}>{member.role}</p>
                    <p className={styles.description}>{member.description}</p>
                    <div className={styles.socialIcons}>
                      {member.linkedin ? (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <FaLinkedin className={styles.linkedinIcon} />
                        </a>
                      ) : (
                        <div style={{ width: "24px", height: "24px", visibility: "hidden" }}></div>
                      )}
                    </div>


                  </div>
                )
              )}
            </div>
          </div>
          {/* Footer Section */}
          <div className={styles.footer}>
            <div className="container text-center">
              <p>&copy; 2025 AK Consultants Pvt. Ltd. All rights reserved.</p>
            </div>
          </div>
        </div>
        {showScrollTop && (
          <button className="scroll-to-top" onClick={scrollToTop}>
            <i className="fa fa-arrow-up" style={{ position: 'relative', right: '1.5px' }}></i>


          </button>
        )}

      </div>
    </>
  );
}