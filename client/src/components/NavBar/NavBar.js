import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";
import Dropdown from "../CategoryDropdown/Dropdown";
import SearchBar from "../SearchBar/SearchBar";
import * as axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getUser, logOutUser } from "../../Actions/Actions";
// import {authAxios} from '../../App'

//Componente navBar
function NavBar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [state, setState] = useState(false)
  const user = useSelector(store => store.getUser)
  const dispatch = useDispatch()

  const handleClick = () => setClick(!click);
  const closeDropdownMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  
  useEffect(async () => {
    if(localStorage.getItem('token')){
      setState(true)
      await dispatch(getUser())
    }
  },[])


  // Cerrar Sesion
  const handleSubmit = () => {
    const authAxios = axios.create({
      baseURL: `http://localhost:3001`,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    const validation = authAxios.post(`/auth/logout`)
    validation && 
    localStorage.clear()
    window.location.reload();
    return false;
  }

    return ( 
        <nav>
            <div className="navContent">
                <div className="logo">
                    <Link to='/'><img src="https://images.unicartapp.com/image/alfioraldo/image/data/2ehFArDM1570100125.png" alt="logo"/></Link>
                </div>
                <div className="center">
                    <SearchBar/>
          <div className="titles">
            <Link to="/">
              <h5 className="">Home</h5>
            </Link>
            <div className="" onClick={handleClick}>
              <div
                className=""
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <Link
                  to="/categories"
                  className="navLinks"
                  onClick={closeDropdownMenu}
                >
                  <h5 className="">Categorías</h5>
                </Link>
                {dropdown && <Dropdown />}
              </div>
            </div>
            <Link to="/">
              <h5 className="">Lo nuevo</h5>
            </Link>
            <Link to="/donate">
              <h5 className="medium">Doná a una OS</h5>
            </Link>
          </div>
        </div>
        {console.log(user)}
        { state ? 
        (
          <div className="account">
            <Link to={`/admin/${user.id}`}>
              <img src="../img/user.png" alt="icono mi Cuenta" />
            </Link>
            <div className='drop'>
              <Link to={`/admin/${user.id}`}>
                <h5 className="medium">
                  Mi
                  <br />
                  Cuenta
                </h5>
              </Link>
              <ul>
                <li><Link to={`/admin/${user.id}`} className='semiBold'>Dashboard</Link></li>
                <li><button className='montserrat semiBold' onClick={handleSubmit}>Cerrar Sesion</button></li>
              </ul>
            </div>
            <Link to="/">
              <img src="../img/heart.png" alt="icono ingresá" />
            </Link>
            <div>
              <Link to="/">
                <h5 className="medium">Mis <br/> Favoritos</h5>
              </Link>
            </div>
            <Link to="/cart">
              <img src="../img/carrito.png" alt="" />
            </Link>
            <div>
              <Link to="/cart">
                <h6 className="light">Carrito</h6>
                <h5>$0.00</h5>
              </Link>
            </div>
          </div>
        ) : (
        <div className="account">
          <Link to="/signup">
            <img src="../img/protection.png" alt="icono Crear Cuenta" />
          </Link>
          <div>
            <Link to="/signup">
              <h5 className="medium">
                Crear
                <br />
                Cuenta
              </h5>
            </Link>
          </div>
          <Link to="/admin/1">
            <img src="../img/log-in.png" alt="icono ingresá" />
          </Link>
          <div>
            <Link to="/admin/1">
              <h5 className="medium">Ingresá</h5>
            </Link>
          </div>
          <Link to="/cart">
            <img src="../img/carrito.png" alt="" />
          </Link>
          <div>
            <Link to="/cart">
              <h6 className="light">Carrito</h6>
              <h5>$0.00</h5>
            </Link>
          </div>
        </div>
      )}
        

      </div>
    </nav>
  );
}

export default NavBar;