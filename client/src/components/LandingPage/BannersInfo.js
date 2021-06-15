import React from "react";
import "./Banners.css";

//Component de LandingPage
export default function BannersInfo() {
  return (
    <div className="bannerInfoContainer">
      <img src="../img/camion-de-reparto.png" alt="envio" />
      <div className="info">
        <h4>Envio gratis</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </p>
      </div>
      <img src="../img/tarjeta-de-credito.png" alt="envio" />
      <div className="info">
        <h4>Medios de Pago</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </p>
      </div>
      <img src="../img/ayuda.png" alt="envio" />
      <div className="info">
        <h4>Ayudar</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </p>
      </div>
    </div>
  );
}
