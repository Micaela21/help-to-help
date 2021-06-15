import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
} from "@material-ui/core";
import {
  createProduct,
  deleteProductCategory,
  editProduct,
  editProductCategory,
  getCategories,
  getProductsDetail,
  
} from "../../Actions/Actions";
import InputLabel from "@material-ui/core/InputLabel";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import "./ProductFormAdd.css";

import CategorySelector from "./CategorySelector";

export const validate = (prod) => {
  let errors = {};
  if (!prod.name) {
    errors.name = "Requerido";
  } else if (!/^[ _a-zA-Z]+( [a-zA-Z]+)*$/i.test(prod.name)) {
    errors.name = "Solo letras";
  } else if (prod.name.length > 25) {
    errors.name = "Debe tener 25 o menos caracteres";
  }
  if (!prod.description) {
    errors.description = "Requerido";
  } else if (!/^[a-zA-Z0-9_ ]+$/i.test(prod.description)) {
    errors.description = "Solo letras";
  }
  if (!prod.price) {
    errors.price = "Requerido";
  } else if (!/^[0-9_ ]+$/i.test(prod.price)) {
    errors.price = "Solo numeros";
  }
  if (!prod.stock) {
    errors.stock = "Requerido";
  } else if (!/^[0_0-9_0]+$/i.test(prod.stock)) {
    errors.stock = "Solo numeros";
  }
  if (!prod.image) {
    errors.image = "Requerido";
  }
  return errors;
};

function EditProductForm({ product, handleClose }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.getCategories);
  // const prodDetail = useSelector((state) => state.getProductsDetail);

  const [prod, setProd] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image: product.image,
  });
  const [cat, setCat] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setProd({ ...prod, [event.target.name]: event.target.value });
    setErrors(
      validate({
        ...prod,
        [event.target.name]: event.target.value,
      })
    );
  };

  useEffect(() => {
    dispatch(getCategories());
    //  dispatch(getProductsDetail(prod.id));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editProduct(product.id, prod))
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Producto</h3>
        <FormControl className="inputCnt">
          <InputLabel htmlFor="name">Nombre</InputLabel>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            value={prod.name}
          />
          {errors.name ? (
            <FormHelperText id="my-helper-text">
              {errors.name}
            </FormHelperText>
          ) : null}
        </FormControl>

        <FormControl className="inputCnt">
          <InputLabel htmlFor="description">Descripcion</InputLabel>
          <Input
            id="description"
            name="description"
            type="text"
            onChange={handleChange}
            value={prod.description}
          />
          {errors.description ? (
            <FormHelperText id="my-helper-text">
              {errors.description}
            </FormHelperText>
          ) : null}
        </FormControl>

        <FormControl className="inputCnt">
          <InputLabel htmlFor="price">Precio</InputLabel>
          <Input
            id="price"
            name="price"
            type="text"
            onChange={handleChange}
            value={prod.price}
          />
          {errors.price ? (
            <FormHelperText id="my-helper-text">
              {errors.price}
            </FormHelperText>
          ) : null}
        </FormControl>

        <FormControl className="inputCnt">
          <InputLabel htmlFor="stock">Stock</InputLabel>
          <Input
            id="stock"
            name="stock"
            type="stock"
            onChange={handleChange}
            value={prod.stock}
          />
          {errors.stock ? (
            <FormHelperText id="my-helper-text">
              {errors.stock}
            </FormHelperText>
          ) : null}
        </FormControl>

        <FormControl className="inputCnt">
          <InputLabel htmlFor="image">Image</InputLabel>
          <Input
            id="image"
            name="image"
            type="text"
            onChange={handleChange}
            value={prod.image}
          />
          {errors.image ? (
            <FormHelperText id="my-helper-text">
              {errors.image}
            </FormHelperText>
          ) : null}
        </FormControl>
        {!errors.name &&
        !errors.description &&
        !errors.price &&
        !errors.stock &&
        !errors.image &&
        prod.image ? (
          <Button
            className="buttonUser"
            variant="contained"
            type="submit"
          >
            Guardar
          </Button>
        ) : null}
      </form>

      <CategorySelector prod={product} cats={categories} />

      <Button
        variant="contained"
        onClick={() => handleClose()}
        className="buttonUser"
      >
        Volver
      </Button>
    </div>
  );
}

export default EditProductForm;
