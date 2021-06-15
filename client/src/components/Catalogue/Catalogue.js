import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard.js';
import { getCategories } from "../../Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Catalogue.css";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

// Componente que renderiza los productos que se les pasa por props
const Catalogue = ({ products, category, user }) => {

  const [ anchorEl, setAnchorEl ] = useState(null);
  const categories = useSelector((state) => state.getCategories);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  /*const promedio = (array) => {
    if(array !== []){
      let sum = array.reduce((previous, current) => current += previous, 0);
      let avg = sum / array.length;
      return avg
    }  
  } */ 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleRel = () => {
    setAnchorEl(null)
  }

  const handleLow = () => {
    products.sort(function(a, b) {
      if ( a.price < b.price) {
          return -1;
      } else if (a.price == b.price) {
          return 0;
      } else {
          return 1;
      }
    })
    setAnchorEl(null)
  }

  const handleHigh = () => {
    products.sort(function(a, b) {
      if ( a.price > b.price) {
          return -1;
      } else if (a.price == b.price) {
          return 0;
      } else {
          return 1;
      }
})
    setAnchorEl(null)
  }

  return (
    <div className='centro'>
      <div className="dale">
        <div className="barraCategories">
          <ul>
            <h2>Categorias</h2>
              {categories?.map((item, index) => {
                return (
                  <li key={index}>
                    <Link className={item.cName} to={`/category/${item.name}`}>
                      - {item.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="tuvieja">
          <div className="titleContainer">
            {category ? category : 'Productos'}
            <div className="sort semiBold">
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Ordenar por
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                >
                  <MenuItem onClick={handleRel}> Más relevante </MenuItem>
                  <MenuItem onClick={handleLow}> Menor precio </MenuItem>
                  <MenuItem onClick={handleHigh}> Mayor precio </MenuItem>
                </Menu>
              {/*<h5>Ordenar por</h5>
              <select>
                <option value="/">Más Relevante</option>
                <option value="/">Menor Precio</option>
                <option value="/">Mayor Precio</option>
              </select>*/}
            </div>
          </div>
          <div className="productsContainer">
            {products?.map((product) => {
              return <ProductCard product={product} user={user} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;