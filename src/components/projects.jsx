import React from "react";

export const Projects = (props) => {
  return (
    <div id="projects" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Projects</h2>
          <p>
          We offer innovative software products that will turn your ideas into reality by skilled developers. All our products are customized for today’s digital era, with premium features picked tending to display your day to day challenges.
          </p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  {" "}
                  <i className={d.icon}></i>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                    <h6>{d.client}</h6>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
