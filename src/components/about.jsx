import React, { useEffect, useRef } from "react";

export const About = (props) => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const animateText = () => {
      const aboutText = aboutRef.current;
      aboutText.classList.add("animate");
    };

    animateText();

    return () => {
      const aboutText = aboutRef.current;
      aboutText.classList.remove("animate");
    };
  }, []);

  return (
    <div id="about" className="d-flex justify-content-center align-items-center" style={{ height: "75vh" }}>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div
              className="about-text"
              ref={aboutRef}
              style={{ maxWidth: '800px', textAlign: 'left', margin: '0 auto' }}
            >
              <h2>About Us</h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              <h3>Why Choose Us?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
