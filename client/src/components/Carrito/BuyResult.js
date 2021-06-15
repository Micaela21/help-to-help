import React, { useEffect, useState } from "react";
import "./Carrito.css";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { sumaTotal} from '../../Actions/Actions.js'

import axios from "axios";

function BuyResult ({id, quantity, price}) {
    const dispatch = useDispatch()
    const [detail,setDetail] = useState()
    const [tot, setTot] = useState()

    useEffect(() => {
        axios({
          method:'GET',
          url:`http://localhost:3001/products/${id}`
        }).then(response => {
            setDetail(response.data)
            setTot(response.data.price * quantity)
        })
      },[])

    useEffect(() => {
        if(localStorage.getItem('cart') && detail){
            let subTot = detail?.price * quantity 
            dispatch(sumaTotal(subTot))
        } else if (price){
            dispatch(sumaTotal(price))
        }
    },[price])

    return (
        <div className="carroSubtotal">
            {
                localStorage.cart && detail && (
                <div>
                    <p>{detail?.name}</p>
                    <h5>{tot}</h5>
                </div>) || 
                localStorage.token && (
                    <div>
                        <p>{detail?.name}</p>
                        <h5>{price}</h5>
                    </div>
                )
            }
        </div>
    );
}

export default BuyResult;