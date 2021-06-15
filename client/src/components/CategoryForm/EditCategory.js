import React, { useState } from "react";
import { useParams } from "react-router";
import { updateCategory } from "../../Actions/Actions";
import { useDispatch } from "react-redux";
import { Button, FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";

export const validate = (category) => {
  let errors = {};
  if (!category.name) {
    errors.name = "Requerido";
  } else if (!/^[ _a-zA-ZÀ-ÿ\u00f1\u00d1]+( _\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1_ ]+$/i.test(category.name)) {
    errors.name = "Solo letras";
  } else if (category.name.length > 25) {
    errors.name = "Debe tener 25 o menos caracteres";
  }
  return errors;
};

//Componente para editar categorias
const EditCategory = () => {
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState({
    name: "",
  });
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory(id, category));
    alert("Categoria editada con exito");
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

export default EditCategory;
