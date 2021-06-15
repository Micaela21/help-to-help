import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Actions/Actions";
import Catalogue from "../Catalogue/Catalogue";
import "./Products.css";

//Componente que renderiza todos los productos del catalogo
function Products({user}) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.getAllProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="products">
      {products && <Catalogue products={products} user={user} />}
    </div>
  );
}

export default Products;
