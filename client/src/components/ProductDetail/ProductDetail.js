import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import { getProductsDetail } from "../../Actions/Actions";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Review from "../Review/Review";


//Componente ProductDetail renderiza detalles de producto
const ProductDetail = () => {
 

  const detail = useSelector((store) => store.getProductsDetail);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [state, setState] = useState(false);
  const [number, setNumber] = useState();
  const [reviews, setReviews] = useState([]);
  const [user,setUser] = useState(false)
  const location = useLocation();
  const orderState = location.state; 
  
  const handleChange = (e) => {
    e.preventDefault();
    setNumber(e.target.value);
  };

  useEffect(() => {
    dispatch(getProductsDetail(id));
    localStorage.getItem('token') && setUser(true)
  }, []);

  // let authAxios;
  // useEffect(() => {
  //   authAxios = axios.create({
  //     baseURL: `http://localhost:3001`,
  //     headers: {
  //       Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  //     }
  //   })
  // },[user])

  const handleClick = () => {
    var cart = {}
    var orderLine = {
      productId: detail.id,
      quantity: 1,
      price: detail.price
    }
  
    if(localStorage.getItem("token")){
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
    } else if (localStorage.getItem("cart")) {
      var dataStorage = JSON.parse(localStorage.cart);
      
      dataStorage[detail.id] = number;
      localStorage.cart = JSON.stringify(dataStorage);
    } else {
        cart[detail.id] = number;
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    setState(true)
    alert("Producto agregado al carrito");
  };

  useEffect(() => {
    dispatch(getProductsDetail(id));
    
  }, []);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:3001/products/${id}/reviews`
    }).then(
      (response) => setReviews(response.data)
    )
  },[])
  return (
    <div>
      <div className="ctner">
        <div className="detailImg">
          <img src={detail.image} alt="img" />
        </div>
        <div className="detailDesc">
          <div>
            <h1>{detail.name}</h1>
          </div>
          <div>
            AR$ <span className="medium">{detail.price}</span>
          </div>
          {detail.stock ? (
            <div>
              {detail.stock <= 10 ? (
                <span className="medium">Ultimas {detail.stock} unidades!</span>
              ) : (
                <span className="medium">{detail.stock} unidades!</span>
              )}
            </div>
          ) : null}
          {detail.stock ? (
            <div className="detailBuy">
              <input
                type="number"
                min="1"
                max={detail.stock}
                placeholder="1"
                onChange={handleChange}
              ></input>
              <div>
                <button className="btn" onClick={handleClick}>
                  AGREGAR AL CARRITO
                </button>
                <br />
              {/* && orderState.status === 'complete'*/}
              {orderState !== undefined ? <Link to={`/products/${detail.id}/reviews`}>
                  <button type="submit" className="btn">
                    DEJA TU REVIEW
                  </button>
                </Link> : null}
                
              </div>
            </div>
          ) : (
            <button className="noDisponible bold">No disponible</button>
          )}
          <div className="light desc">
            <div>Descripción:</div>
            {detail.description}
          </div>
          <div className="detailDesc"></div>
        </div>
      </div>
      <Container maxWidth="sm" className="reviews">
        {reviews.map((review) => {
          return <Review review={review} />;
        })}
      </Container>
    </div>
  );
};

export default ProductDetail;
