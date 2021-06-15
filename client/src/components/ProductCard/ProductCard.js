import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import DialogComp from "./Dialog.js";
import axios from 'axios'
import OrderLine from "../Carrito/OrderLine";

//Componente productCard recibe props de cada producto
//Para reutilizar este componente paso segundo parametro asi diferencio
//entre renderizar con o sin boton comprar segun el uso
const ProductCard = ({ product }) => {

  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      const data = JSON.parse(localStorage.getItem("cart"));
      if (data[product.id]) {
        setState(true);
      }
    } 
    // else if (localStorage.getItem('token')){
    //   setUser(true)
    //   authAxios.get(`/auth/me`)
    //   .then(response => {
    //     const userId = response.data.id
    //     return axios({
    //       method: "GET",
    //       url: `http://localhost:3001/users/${userId}/cart`,
    //     }).then(response => {
    //       const cart = response.data
    //           cart.map(obj => {
    //             if(obj.id === product.id){
    //               setState(true)
    //             }
    //           })
    //     })
    //   })
    // }
  }, []);


  const handleClick = () => {
    var cart = {};
    var orderLine = {
      productId: product.id,
      quantity: 1,
      price: product.price
    }
    if (localStorage.getItem("token")) {
      const authAxios = axios.create({
        baseURL: `http://localhost:3001`,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      authAxios.get(`/auth/me`)
      .then(response => {
        const userId = response.data.id
        axios({
          method: "POST",
          url: `http://localhost:3001/users/${userId}/cart`,
          data: orderLine
        })
      })
    }
    else if (localStorage.getItem("cart")) {
      var dataStorage = JSON.parse(localStorage.cart);
      dataStorage[product.id] = 1;
      localStorage.cart = JSON.stringify(dataStorage);
    } else {
      cart[product.id] = 1;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    setState(true);
    setOpen(true);
  };

  return (
    <div className="productCard">
      {open ? (
        <DialogComp open={open} setOpen={setOpen} product={product} />
      ) : null}
      <Link to={`/productDetail/${product.id}`}>
        <div className="productImg">
          <img src={product.image} alt="imagen de producto" />
        </div>
        <div className="cardDescription">
          <h5 className="medium">{`AR$ ${product.price}`}</h5>
          <h6>{product.name}</h6>
          <p>{product.description}</p>
        </div>
      </Link>
      {product.stock ? (
        <div className="buyButton" onClick={handleClick}>
          <img src="../img/carritoBlanco.png" alt="carrito" />
          {state ? (
            <h4 className="bold"> Producto en el Carrito</h4>
          ) : (
            <h4 className="bold" onClick={handleClick}>
              Agregar al Carrito
            </h4>
          )}
        </div>
      ) : (
        <button className="noDisponible bold">No disponible</button>
      )}
    </div>
  );
};

export default ProductCard;
