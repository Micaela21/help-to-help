import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategories } from "../../Actions/Actions";
import { Button } from "@material-ui/core";
import EditCategory from "./EditCategory";
import "./AllCategories.css";

//Componente que muestra todos las categorias con acceso edicion, borrar y agregar categoria
const AllCategories = () => {
  const [click, setClick] = useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.getCategories);

  useEffect(() => {
    dispatch(getCategories());
  }, [click]);

  const handleEdit = (event) => {
    event.preventDefault();
    setEdit(true);
  };

  return (
    <div>
      {!edit ? (
        categories?.map((obj) => {
          return (
            <div key={obj.id} className="editCategory">
              <h4>{obj.name}</h4>
              <Button
                variant="contained"
                onClick={handleEdit}
                size="small"
              >
                Editar
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  const alert = window.confirm(
                    "Seguro quieres eliminar esta categoria?"
                  );
                  if (alert) {
                    dispatch(deleteCategory(obj.id));
                    setClick(true);
                  }
                }}
              >
                Eliminar
              </Button>
            </div>
          );
        })
      ) : (
        <EditCategory />
      )}
    </div>
  );
};

export default AllCategories;
