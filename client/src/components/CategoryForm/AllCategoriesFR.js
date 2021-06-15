import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategories } from "../../Actions/Actions";
import { Button } from "@material-ui/core";
import EditCategory from "./EditCategory";
import "./AllCategories.css";

//Componente que muestra todos las categorias con acceso edicion, borrar y agregar categoria
const AllCategoriesFR = () => {
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
    <div className='backg'>
      <div className='allCat'>
        
        {categories?.map((obj) => {
            return (        
              <Link to={`/category/${obj.name}`}><div key={obj.id} className="">
                <h4>{obj.name}</h4>
                <hr className='horizontal' />
              </div></Link>
            );
          })
        }
      </div>
    </div>
  );
};

export default AllCategoriesFR;
