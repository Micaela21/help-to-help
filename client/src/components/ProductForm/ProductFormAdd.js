import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
} from "@material-ui/core";
import {
  createProduct,
  editProductCategory,
  getCategories,
} from "../../Actions/Actions";
import InputLabel from "@material-ui/core/InputLabel";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import "./ProductFormAdd.css";

export const validate = (prod) => {
  let errors = {};
  if (!prod.name) {
    errors.name = "Requerido";
  } else if (
    !/^[ _a-zA-ZÀ-ÿ\u00f1\u00d1]+( _\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1_ ]+$/i.test(
      prod.name
    )
  ) {
    errors.name = "Solo letras";
  } else if (prod.name.length > 25) {
    errors.name = "Debe tener 25 o menos caracteres";
  }
  if (!prod.description) {
    errors.description = "Requerido";
  } else if (
    !/^[ _0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+( _\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1_ ]+$/i.test(
      prod.description
    )
  ) {
    errors.description = "Solo letras y numeros";
  }
  if (!prod.price) {
    errors.price = "Requerido";
  } else if (!/^[0-9]+$/i.test(prod.price)) {
    errors.price = "Solo numeros";
  }
  if (!prod.stock) {
    errors.stock = "Requerido";
  } else if (!/^[0-9]+$/i.test(prod.stock)) {
    errors.stock = "Solo numeros";
  }
  if (!prod.images) {
    errors.image = "Requerido";
  }
  return errors;
};

function ProductFormAdd() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.getCategories);
  const newProd = useSelector((state) => state.getNewProduct);
  const [prod, setProd] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    images: [],
  });
  const [cat, setCat] = useState({});
  const [errors, setErrors] = useState({});
  const [createProd, setCreateProd] = useState(true);
  var image;

  const handleChange = (event) => {
   
    setProd({ ...gettingImage(), [event.target.name]: event.target.value})     
     
    setErrors(
      validate({
        ...prod,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleChange2 = (event) => {
    setCat({
      ...cat,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const gettingImage = () => {
    setProd({...prod, [prod.images]: prod.images.push(prod.image)})
    return prod
  }
  const handleSubmit = (event) => {
    
    event.preventDefault();
    dispatch(createProduct(prod));
    console.log(prod)
    setCreateProd(false);
  };

  const handleSubmit2 = (event) => {
    // event.preventDefault();
    for (let i in cat) {
      console.log(i);
      console.log(cat[i]);
      if (cat[i]) {
        dispatch(editProductCategory(newProd.id, i));
      }
    }
    alert("Categoria asignada");
  };

  

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            value={image}
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
        prod.images ? (
          <Button
            className="buttonUser"
            variant="contained"
            type="submit"
          >
            Guardar
          </Button>
        ) : null}
      </form>
      {!createProd ? (
        <form onSubmit={handleSubmit2}>
          <h3>Categorias</h3>
          {categories?.map((item, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    name={item.id}
                    color="grey"
                    onChange={handleChange2}
                  />
                }
                label={item.name}
              />
            );
          })}
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </form>
      ) : null}
    </div>
  );
}

export default ProductFormAdd;
