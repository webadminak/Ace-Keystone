import React, { useEffect } from "react";

export const Header = (props) => {
  useEffect(() => {
    const images = [
      '../img/img14.jpg',
      '../img/img16.jpg',
      '../img/img18.jpeg',
      '../img/img11.jpg'
    ];

    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <header id="header">
      <div className="intro">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 intro-text">
              <h1>
                {props.data ? props.data.title : "Loading"}
                <span></span>
              </h1>
              <p>{props.data ? props.data.paragraph : "Loading"}</p>
              <a
                href="#about"
                className="btn btn-custom btn-lg page-scroll"
              >
                Learn More
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
