import React from "react";

// Import local images
import Sathyapriya from '../img/Sathyapriya.jpg';
import Maria from '../img/Maria Anto Benita - pic.jpg'

function Interns() {
  let message = `"Our interns are the bright minds of tomorrow, gaining hands-on experience and practical skills at AK Technologies.\n With a passion for learning and innovation, they collaborate on real-world challenges, growing into the next generation of industry leaders."`;
  return (
    <section id="team" className="section-white">
      <div className="container" style={{ position: 'relative', top: '160px' }}>
        {/* Our Success Team Section */}
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="section-title" style={{ color: 'white' }} >INTERNS</h2>
            <p class="section-subtitle" style={{ color: 'white' }}>{message}</p>
          </div>

          <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="team-item">
              <img src={Maria} class="team-img" alt="pic" />
              <h3>Maria Anto Benita</h3>
              <div className="team-info">
                <p>Student Intern</p>
              </div>
              <h3 style={{ fontSize:'15px', fontWeight:'600', lineHeight:'20px'}} >
              Maria Anto Benita is an intern at AK Technologies, gaining practical 
              experience in engineering and technology. She is eager to learn and develop 
              her technical skills, focusing on problem-solving and system optimization. 
              As part of her internship, she is involved in exploring innovative approaches 
              to wireless communication and signal processing, contributing to research-driven advancements in the field.
​
              </h3 >
              <ul className="team-icon">
               
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="team-item">
              <img src={Sathyapriya} class="team-img" alt="pic" />
              <h3>Sathyapriya</h3>
              <div className="team-info">
                <p>Student Intern​</p>
              </div>
              <h3 style={{ fontSize:'15px', fontWeight:'600', lineHeight:'20px'}}>
              Our intern Sathyapriya is  passionate about expanding her technical 
              knowledge and hands-on experience. She is focused on building a strong 
              foundation in engineering concepts while contributing to ongoing research 
              and development efforts. Her work includes exploring next-generation 
              connectivity solutions, enhancing system efficiency, and addressing real-world challenges in wireless communication.
              </h3>
              <ul className="team-icon">
                
              </ul>
            </div>
          </div>
        </div>         
        </div>     
         {/* Centered Vaishnavi with reduced width */}
         {/* <div className="col-md-6 col-md-offset-3 text-center">
            <div className="team-item" >
              <img src={priyaImage} class="team-img" alt="pic" />
              <h3>Sudhanthirapriya Sundaram</h3>
              <div className="team-info">
                <p>Junior Machine Learning Engineer</p>
              </div>
              <h3 style={{ fontSize:'15px', fontWeight:'600', lineHeight:'20px'}}>
              Our Junior Machine Learning Engineer is passionate about developing AI solutions 
              that solve complex problems and drive meaningful impact. She designs, trains, 
              and optimises machine learning models, ensuring their efficiency and accuracy 
              across various applications. With a strong analytical mindset, she collaborates 
              with senior engineers to implement advanced AI technologies and enhance model performance.
              Known for her curiosity and innovative approach, actively documents processes, and contributes to improving machine 
              learning systems. Committed to professional growth, 
              she shares her knowledge with team members and embraces new challenges, helping to drive continuous improvement within the organisation.
              </h3>
              <ul className="team-icon">
                <li>
                  <a
                    href="https://www.linkedin.com/in/-sudhanthirapriya/"
                    className="twitter"
                    aria-label="Linkedin"
                    target="_blank" rel="noopener noreferrer"
                  >
                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
      </div>
      {/* Footer Section */}
      <div id="footer" style={{ backgroundColor: '#0F1035', color: 'white', padding: '40px', marginTop: '180px' }}>
        <div className="container text-center">
          <p>&copy; 2024 AK Technologies Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>

    </section>
  );
}

export default Interns;
