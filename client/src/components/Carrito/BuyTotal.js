import React, { useEffect, useState } from "react";
import "./Carrito.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { cart, getProducts } from "../../Actions/Actions";

function BuyTotal() {

  const total = useSelector(store => store.total)
  console.log(total)

  return (
    <div className="carroSubtotal">
      <h4>{total}</h4>
    </div>
  );
}

export default BuyTotal;
