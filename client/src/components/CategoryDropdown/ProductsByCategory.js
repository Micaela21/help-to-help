import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../../Actions/Actions";
import Catalogue from "../Catalogue/Catalogue";

function ProductsByCategory() {
  const products = useSelector((state) => state.getProductsByCategory);
  const dispatch = useDispatch();
  const { name } = useParams();

  useEffect(() => {
    dispatch(getProductsByCategory(name));
  }, [name]);

  return (
    <div>{products && <Catalogue products={products} category={name} />}</div>
  );
}

export default ProductsByCategory;
