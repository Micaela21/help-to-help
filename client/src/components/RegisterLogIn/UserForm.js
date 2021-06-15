import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getProducts } from "../../Actions/Actions";
import "./userForm.css";
import { FormHelperText } from '@material-ui/core';

export const validate = (prod) => {
  let errors = {};
  if (!prod.userName) {
    errors.userName = "Campo obligatorio";
  } else if (!/^[ _0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+( _\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1_ ]+$/i){
    errors.userName = "Incluir letras y numeros";
  } else if (prod.userName.length < 8 || prod.userName.length > 25) {
    errors.userName = "Debe tener de 8 a 25 caracteres";
  }
  if (!prod.firstName) {
    errors.firstName = "Campo obligatorio";
  } else if (!/^[ _a-zA-ZÀ-ÿ\u00f1\u00d1]+( _\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1_ ]+$/i.test(prod.firstName)){
    errors.firstName = "Solo letras";
  } else if (prod.userName.length < 5 || prod.userName.length > 25){
    errors.firstName = "Debe tener de 5 a 25 caracteres";
  }
  if (!prod.lastName) {
    errors.lastName = "Este campo es obligatorio. 5 a 25 caracteres. Incluir letras y numeros";
  } else if (!/^[ _a-zA-ZÀ-ÿ\u00f1\u00d1]+( _\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1_ ]+$/i.test(prod.lastName)){
    errors.lastName = "Solo letras";
  } else if (prod.userName.length < 5 || prod.userName.length > 25){
    errors.lastName = "Debe tener de 5 a 25 caracteres";
  }
  if (!prod.email) {
    errors.email = "Este campo es obligatorio";
  } else if (!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(prod.email)){
    errors.email = "No es un email valido";
  }
  if (!prod.password) {
    errors.password = "Campo obligatorio"
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/.test(prod.password)){
    errors.password = "Incluir al menos una letra, numero y un caracter especial"
  } else if (prod.userName.length < 8 || prod.userName.length > 25) {
    errors.password = "8 a 25 caracteres"
  }
  return errors;
}

const UserForm = () => {

  const history = useHistory()
  const [products,setProducts] = useState([])
  const [errors, setErrors] = useState({});

  const [userValues, setUserValues] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setUserValues({
      ...userValues,
      [e.target.name]: e.target.value,
    })
    setErrors(
      validate({
        ...userValues,
        [e.target.name]: e.target.value,
      })
    )
  };

  useEffect( async () => {
    await axios({
      method: 'GET',
      url: "http://localhost:3001/products",
    })
      .then(response => {
        if(localStorage.getItem("cart")){
          let carrito = Object.keys(JSON.parse(localStorage.getItem("cart"))).map((id) => parseInt(id))
          carrito && carrito.forEach(id => {
            response.data.map(obj => {
              if(obj.id === id) {
                setProducts(old => [...old,obj])
              }
            })
          })
        }
      })
  }, []);

  const handleSubmit1 = (e) => {
    e.preventDefault();
    var body = userValues;
    axios({
      method: "POST",
      url: "http://localhost:3001/users",
      data: body
    })
      .then(async () => {
        return await axios({
          method: 'POST',
          url:`http://localhost:3001/auth/login`,
          data:{
            email: userValues.email,
            password: userValues.password
          }
        })
      })
        .then(async (response) => {
          var token = JSON.stringify(response.data.token)
          localStorage.setItem('token', token)
          const userId = response.data.user.id
          for (var i = 0; i < products.length; i++) {
            var cant = Object.values(JSON.parse(localStorage.getItem("cart"))).map((id) => parseInt(id));
            await axios({
              method: "POST",
              url: `http://localhost:3001/users/${userId}/cart`,
              data: {
                productId: products[i].id,
                quantity: cant[i],
                price: products[i].price
              }
            })
          }
         })
          .then((response) => {
            console.log(response);
            alert("Usuario creado exitosamente");
            localStorage.removeItem("cart");
            // history.goBack('/cart')
          })
          
          .then( response => {
            axios({
              method: 'POST',
              url: `http://localhost:3001/users/nuevoRegistro`,
              data: body,
            })
          })
    }

  const handleSubmit2 = (e) => {
    e.preventDefault();
    var body = userValues;
    axios({
      method: "POST",
      url: "http://localhost:3001/users",
      data: body
    })
      .then(async () => {
        return await axios({
          method: 'POST',
          url:`http://localhost:3001/auth/login`,
          data:{
            email: userValues.email,
            password: userValues.password
          }
        })
      })
        .then((response) => {
          var token = JSON.stringify(response.data.token)
          localStorage.setItem('token', token)
          alert("Usuario creado exitosamente");
          // history.push('/')
      })
      .then( response => {
        axios({
          method: 'POST',
          url: `http://localhost:3001/users/nuevoRegistro`,
          data: body,
        })
      })
    }

  return (
    <div>
      <form onSubmit={products ? handleSubmit1 : handleSubmit2} className="registerForm">
      <h2>¡REGISTRATE!</h2>
      <div className="full">
          <label>Usuario</label>
          <input
            type="text"
            name="userName"
            value={userValues.userName}
            onChange={handleInputChange}
          />
            {errors.userName ? <FormHelperText id="my-helper-text">{errors.userName}</FormHelperText> : null}
        </div>
        <div className="full">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={userValues.email}
            onChange={handleInputChange}
          />
          {errors.email ? <FormHelperText id="my-helper-text">{errors.email}</FormHelperText> : null}
        </div>
        <div className="full">
          <label>Nombre</label>
          <input
            type="text"
            name="firstName"
            value={userValues.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName ? <FormHelperText id="my-helper-text">{errors.firstName}</FormHelperText> : null}
        </div>
        <div className="full">
          <label>Apellido</label>
          <input
            type="text"
            name="lastName"
            value={userValues.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName ? <FormHelperText id="my-helper-text">{errors.lastName}</FormHelperText> : null}
        </div>
        <div className="full">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={userValues.password}
            onChange={handleInputChange}
          />
          {errors.password ? <FormHelperText id="my-helper-text">{errors.password}</FormHelperText> : null}
        </div>
        {
          !errors.userName &&
          !errors.email &&
          !errors.firstName &&
          !errors.lastName &&
          !errors.password &&
          <div className="full">
          <button type="submit">Agregar</button>
          </div>
        }
      </form>
    </div>
  );
};

export default UserForm;
