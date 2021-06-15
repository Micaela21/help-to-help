import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../Actions/Actions";
import EditProductForm from './EditProductForm'
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";



const ProductsTable = () => {
  const [edit, setEdit] = useState(false);
  const [toEdit, setToEdit] = useState();
  const products = useSelector((state) => state.getAllProducts);
  const dispatch = useDispatch();

  const [borrar, setBorrar] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [borrar]);

  function handleDelete(id) {
    dispatch(deleteProduct(id));
    setBorrar(true);
  }
  const handleEdit = async (prodToEdit) => {
    setEdit(!edit);
    await setToEdit(prodToEdit);
  };
  
  const handleClose = () => {
    setEdit(!edit);
  };
  return (
    <div>
      <div className="newCardsCnt">
        {!edit ? (
          products?.map((product) => {
            // console.log(product);
            return (
              <div>
                <ProductTable
                  product={product}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              </div>
            );
          })
        ) : (
          <EditProductForm
            product={toEdit}
            handleClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsTable;