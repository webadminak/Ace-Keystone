import React, { useEffect, useState } from "react";

export const Header = (props) => {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const images = [
      '../img/img14.jpg',
      '../img/img16.jpg',
      '../img/img18.jpeg',
      '../img/img11.jpg'
    ];

    const changeImage = () => {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      setBackgroundImage(`url(${randomImage})`);
    };

    // Change image immediately when the component mounts
    changeImage();

    // Set up an interval to change the image every 5 seconds
    const intervalId = setInterval(changeImage, 2000); // Change 5000 to any number of milliseconds you prefer

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    document.querySelector('.image-background').style.backgroundImage = backgroundImage;
  }, [backgroundImage]);

  return (
    <header id="header">
      <div className="intro">
        <div className="image-background" />
        <div className="overlay" />
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 intro-text">
              <h1>
                {props.data?.title || "Loading"}
                <span></span>
              </h1>
              <p>{props.data?.paragraph || "Loading"}</p>
              <a href="#about" className="btn btn-custom btn-lg page-scroll">
                Our Product
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
