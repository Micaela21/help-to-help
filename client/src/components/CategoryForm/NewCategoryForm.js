import React, { useState } from "react";
import "./NewCategoryForm.css";
import { newCategory } from "../../Actions/Actions";
import { useDispatch } from "react-redux";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";

export const validate = (category) => {
  let errors = {};
  if (!category.name) {
    errors.name = "Requerido";
  } else if (!/^[a-zA-Z_ ]+$/i.test(category.name)) {
    errors.name = "Solo letras";
  } else if (category.name.length > 15) {
    errors.name = "Debe tener 15 o menos caracteres";
  }
  return errors;
};

//Componente para crear categoria
const NewCategoryForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState({
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newCategory(category));
    alert("Categoria creada con exito");
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <FormControl className="inputCnt">
          <InputLabel htmlFor="name">Nombre de la Categoria</InputLabel>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={(e) =>{
              setCategory({ [e.target.name]: e.target.value });
              setErrors(validate({[e.target.name]: e.target.value}))
            }}
            value={category.name}
          />
          {errors.name ? (
            <FormHelperText id="my-helper-text">
              {errors.name}
            </FormHelperText>
          ) : null}
        </FormControl>
        {!errors.name && category.name ? (
          <Button
            className="buttonUser"
            variant="contained"
            type="submit"
          >
            Guardar
          </Button>
        ) : null}
      </form>
    </div>
  );
};

export default NewCategoryForm;
