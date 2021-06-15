import React from "react";
import "./Banners.css";
import "../NavBar/NavBar.css";
import { Link } from "react-router-dom";
import { SliderData } from "./BannerSlider";
import BannerSlider from "./BannerSlider";

//Componente de LandingPage
export default function Banners() {
  const banner1 = "./img/banner.jpg";

  return (
    <div className="banners">
      <div className="banner1">
        <div>
          <img src={banner1} alt="Banner Primario" className="" />
        </div>
        <div>
          <h3 className="title">
            Ayudá al mundo <br /> comprando...
          </h3>
          <h5 className="subTitle">
            El dinero de todas las ventas ayudan a ONG’s
          </h5>
        </div>
        <div className="">
          <Link to="/catalogue">
            <button className="button">
              Ver Productos
              <img src="../img/fast-forward.png" className="btnImg" />
            </button>
          </Link>
        </div>
      </div>
      <div className="banner2">
        {/* <img src={banner3} /> */}
        <BannerSlider slides={SliderData} />
      </div>
    </div>
  );
}
