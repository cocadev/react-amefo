import React from "react";
import slider1 from "../../../assets/slider1.jpg";
import slider2 from "../../../assets/slider2.jpg";
import slider3 from "../../../assets/slider3.jpg";

function Carrousel() {
  return (
    <div id="mainCarrousel" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#mainCarrousel" data-slide-to="0" className="active" />
        <li data-target="#mainCarrousel" data-slide-to="1" />
        <li data-target="#mainCarrousel" data-slide-to="2" />
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={slider1} alt="slider 1" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={slider2} alt="slider 2" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={slider3} alt="slider 3" />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#mainCarrousel"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#mainCarrousel"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

export default Carrousel;
