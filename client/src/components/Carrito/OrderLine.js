import React, { useEffect, useState } from "react";
import "./Carrito.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { cart, editQuantity, getProductsDetail } from '../../Actions/Actions.js'
import axios from "axios";

function OrderLine ({ id, quantity }){

  const dispatch = useDispatch()
  const [detail,setDetail] = useState()
  const [input,setInput] = useState(quantity)
  var carritoUser = useSelector((store) => store.cart);
  const [newProducts, setNewProducts] = useState([]);
  const [user, setUser] = useState(false)
  const [userId, setUserId] = useState()

  useEffect(() => {},[input])

  useEffect(() => {
    axios({
      method:'GET',
      url:`http://localhost:3001/products/${id}`
    }).then( async response => 
      await setDetail(response.data))
  },[])

  let authAxios;
  useEffect(() => {
    authAxios = axios.create({
      baseURL: `http://localhost:3001`,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
  },[user])

  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.getItem('token') && setUser(true)
      authAxios.get(`/auth/me`)
      .then(response => {
        setUserId(response.data.id);
      })
    }
  },[]);

  const handleClickOrderL = () => {
    if (localStorage.getItem("cart")) {
      var cart = JSON.parse(localStorage.getItem("cart"));
      delete cart[id];
      localStorage.setItem("cart", JSON.stringify(cart));
      setNewProducts((old) => [...old.filter((el) => el.id !== id)]);
    }
    else if (!localStorage.getItem("cart")) {
      axios({
        method: "DELETE",
        url: `http://localhost:3001/users/${userId}/cart/${id}`,
      }).then((response) => {
        carritoUser = response.data.products;
        window.location.reload();
        return false;
      })
    }
  };

  
  const suma = () => {
    setInput(old => old + 1)
    // handleChange()
  }
  const resta = () => {
    setInput(old => old - 1)
    // handleChange()
  }

  useEffect(() => {
    if(localStorage.getItem('token') && detail){
      console.log(input)
      axios({
        method: "PUT",
        url: `http://localhost:3001/users/${userId}/cart`,
        data: {
          productId: id,
          quantity: input,
          price: detail.price * input,
        }
      }).then((response) => {
      dispatch(cart(userId));
      // window.location.reload()
    })
    } else if (localStorage.getItem('cart')){
      let carrito = JSON.parse(localStorage.getItem("cart"));
      carrito[id] = input;
      localStorage.cart = JSON.stringify(carrito);
    }
  },[input,detail])



  return (
    <div id="productConteiner" className="carroProduct">
      {
        detail ? (
          <div>
            <Link to={`/productDetail/${detail.id}`}>
              <img src={detail.image} alt={detail.name} />
            </Link>
            <div className="productDetail">
              <div className="titular">
                <Link to={`/productDetail/${detail.id}`}>
                  <h2 className="medium">{detail.name}</h2>
                </Link>
                <h2 className="medium">$ {detail.price * input}</h2>
              </div>
              <div>
                <p>Últimas {detail.stock} Unidades</p>
                <p>Vendido por:</p>
                <div>
                      <button onClick={resta}>-</button>
                      <input type="text" value={input} name={detail.id}/>
                      <button onClick={suma}>+</button>

                </div>
              </div>
            </div>
            <button onClick={handleClickOrderL}>Eliminar</button>
          </div>
        ) : null
      }
    </div>
  );
}

export default OrderLine;
