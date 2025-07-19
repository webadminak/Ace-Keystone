import React, { useState } from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Contact.module.css";
import { Helmet } from "react-helmet";


const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = (props) => {

  useEffect(() => {
    AOS.init({
        duration: 1000, // Animation duration in ms
        once: true,     // Only animate once
    });
}, []);

  const [{ name, email, message }, setState] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your existing form submission logic
    const formData = new FormData();
    formData.append("access_key", "ff1c17dd-8a36-465a-a352-b401b0599ae0");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setState(initialState);
        setTimeout(() => setSubmitted(false), 2000); // Reset the 'submitted' state after 5 seconds
      } else {
        console.error("Form submission failed:", result);
        alert("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Contact Us</title>
        <link rel="canonical" href="https://www.ak-tech.in/contact" />
      </Helmet>
      <div>
        <div id="contact" data-aos="fade-up">
          <div className="container">
            <div className="col-md-8">
              <div className="row">
                <div className="section-title">
                  <h2 data-aos="fade-up">Get In Touch</h2>
                  <p data-aos="fade-up">
                    Please fill out the form below to send us an email and we will
                    get back to you as soon as possible.
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  name="contact-form"
                  data-aos="fade-up"
                >
                  <input
                    type="hidden"
                    name="access_key"
                    value="ff1c17dd-8a36-465a-a352-b401b0599ae0"
                  />
                  <div className="row" data-aos="fade-up" >
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Name"
                          required
                          value={name}
                          onChange={handleChange}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6" data-aos="fade-up">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          required
                          value={email}
                          onChange={handleChange}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                  <div className="form-group" data-aos="fade-up">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows="4"
                      placeholder="Message"
                      required
                      value={message}
                      onChange={handleChange}
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div id="success"></div>
                  <button type="submit" className="btn btn-custom btn-lg">
                    Send Message
                  </button>
                </form>
                {submitted && (
                  <div className="popup">
                    <div className="popup-content">
                      <p style={{color:"black"}}>Thank you! Your message has been sent.</p>
                    </div>
                  </div>
                )}

              </div>
            </div>
            <div className="col-md-3 col-md-offset-1 contact-info">
              <div className="contact-item" data-aos="fade-up">
                <h3>Contact Info</h3>
                <p>
                  <span data-aos="fade-up">
                    <i className="fa fa-map-marker"></i> Address
                  </span>
                  PSG - Science and Technology Entrepreneurical Park(PSG-STEP),E8 Block, PSG iTECH Campus, Neelambur, Coimbatore <br /> Tamil Nadu- 641 062
                </p>
                <p>
                  <span data-aos="fade-up">
                    <i className="fa fa-map-marker"></i> Address
                  </span>
                  113, B2 Block, Karayampalayam Road, Mylampatti, Chinniyampalayam, Coimbatore<br /> Tamil Nadu - 641 062
                </p>
              </div>
              <div className="contact-item" data-aos="fade-up" >
                <p>
                  <span data-aos="fade-up">
                    <i className="fa fa-phone"></i> Phone
                  </span>{" "}
                  +91-8925531013 ( Preferred )<br />
                  +0422-714-1405
                </p>
                
              </div>

              <div className="contact-item" data-aos="fade-up">
                <p>
                  <span >
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                  Email
                  </span>{" "}
                  info@ak-tech.in
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span >
                  <i className="fab fa-linkedin" ></i>{" "}{" "}

                    <a
                      href="https://www.linkedin.com/company/ak-tech-group/posts/?feedView=all"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer', paddingLeft:'10px', fontWeight:'500'}}
                      onMouseEnter={(e) => { e.target.style.color = 'white'; }}
                      onMouseLeave={(e) => { e.target.style.color = 'inherit'; }}
                    >
                      LinkedIn
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* Footer Section */}
      <div className="footer">
        <div className="container text-center">
          <p>&copy; 2025 AK Technologies Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
