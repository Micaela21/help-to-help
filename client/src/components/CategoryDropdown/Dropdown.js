import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";
import { getCategories } from "../../Actions/Actions";
import { useDispatch, useSelector } from "react-redux";

// Componente de navBar renderiza categorias
function Dropdown() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const categories = useSelector((state) => state.getCategories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdownMenu clicked" : "dropdownMenu"}
      >
        {categories?.map((item, index) => {
          return (
            <Link
              className={item.cName}
              to={`/category/${item.name}`}
              onClick={() => setClick(false)}
            >
              <li key={index}>
                  <div className="semiBold">{item.name}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;