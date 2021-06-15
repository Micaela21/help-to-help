import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getProductsByKeyword } from "../../Actions/Actions.js";
import Catalogue from "../Catalogue/Catalogue";
import { useParams } from "react-router";

//Componente que renderiza los componentes buscados
export default function SearchResults() {
  const { keyword } = useParams()
  const products = useSelector((state) => state.getProductsByKeyword);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProductsByKeyword(keyword));
  }, []);

  return <div>{products && <Catalogue products={products} />}</div>;
}
