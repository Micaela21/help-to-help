import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

//Componente de LandingPage
export const SliderData = [
  {
    image: "./img/beerBanner.jpg",
  },
  {
    image: "./img/banner2.jpg",
  },
  {
    image: "./img/bannerNavidad.jpg",
  },
];
const BannerSlider = ({ slides }) => {
  const [current, stateCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    stateCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    stateCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className="banner2">
      <FaArrowAltCircleLeft className="leftArrow" onClick={prevSlide} />
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && <img src={slide.image} alt="travel image" />}
          </div>
        );
      })}
      <FaArrowAltCircleRight className="rightArrow" onClick={nextSlide} />
    </div>
  );
};

export default BannerSlider;
