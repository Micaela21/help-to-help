import React, { useEffect, useState } from "react";
import "./RegisterLogIn.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormHelperText } from '@material-ui/core';
import GoogleLogin from 'react-google-login';

export const validate = (prod) => {
  let errors = {}
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/i.test(prod.newPassword)){
      errors.newPassword = "Incluir al menos una letra, numero y un caracter especial"
    } else if (prod.newPassword.length < 8 || prod.newPassword.length > 25){
      errors.newPassword = "Debe tener de 8 a 25 caracteres"
    }
    if(prod.newPassword !== prod.repeatNewPassword){
        errors.repeatNewPassword = "Las contraseñas deben ser iguales"
    }
    return errors
  }

function LogInForm() {

  const [open, setOpen] = useState(false);
  const history = useHistory()
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState()
  const [token, setToken] = useState()
  const [errors, setErrors] = useState({});
  const [userValues, setUserValues] = useState({
    email: "",
    password: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3001/products",
    }).then((response) => {
      if (localStorage.getItem("cart")) {
        let carrito = Object.keys(
          JSON.parse(localStorage.getItem("cart"))
        ).map((id) => parseInt(id));
        carrito &&
          carrito.forEach((id) => {
            response.data.map((obj) => {
              if (obj.id === id) {
                setProducts((old) => [...old, obj]);
              }
            });
          });
      }
    });
  }, []);

  const responseGoogle = (response) => {
    console.log(response)
  }  
  const okGoogle = (response) => {
    const mail = response.profileObj.email
    axios({
      method: 'GET',
      url: `http://localhost:3001/users/google/${mail}`
    })
      .then(async (user) => {
          if (user.data === null) {
          return await axios({
            method: 'POST',
            url: `http://localhost:3001/users`,
            data: {
              userName: response.profileObj.email,
              email: response.profileObj.email,
              firstName: response.profileObj.givenName,
              lastName: response.profileObj.familyName,
              password: response.profileObj.email
            }
          })
        } else {
          return axios({
            method: 'GET',
            url: `http://localhost:3001/users/google/${mail}`
          })
        }
      })
      .then(async (user) => {
        if (products) {
          return axios({
            method: 'POST',
            url: `http://localhost:3001/auth/login`,
            data: {
              email: user.data.email,
              password: user.data.email
            }
          })
            .then(async (response) => {
              var token = JSON.stringify(response.data.token)
              localStorage.setItem('token', token)
              const userId = response.data.user.id
              for (var i = 0; i < products.length; i++) {
                var cant = Object.values(JSON.parse(localStorage.getItem("cart"))).map((id) => parseInt(id));
                return await axios({
                  method: "POST",
                  url: `http://localhost:3001/users/${userId}/cart`,
                  data: {
                    productId: products[i].id,
                    quantity: cant[i],
                    price: products[i].price
                  }
                })
              }
            }).then(() => {
              alert("Logueado exitosamente")
              localStorage.removeItem('cart')
              // history.goBack()
            })
        } else {
          return axios({
            method: 'POST',
            url: `http://localhost:3001/auth/login`,
            data: {
              email: user.data.email,
              password: user.data.email
            }
          })
            .then((response) => {
              var token = JSON.stringify(response.data)
              localStorage.setItem('token', token)
              alert("Logueado exitosamente")
              // history.goBack()
            }).catch((err) => {
              alert("Usuario no pudo ser logueado")
            })

        }
      })
   
  }

  function reloadPage(){ 
    window.location.reload(); 
}
  const handleSubmit1 = (e) => {
    e.preventDefault()
    axios({
      method: "POST",
      url: `http://localhost:3001/auth/login`,
      data: userValues
    })
      .then(async response => {
        setUserId(response.data.user)
        if (response.data.user.resetPassword) {
          open = true
        } else {
          var token = JSON.stringify(response.data.token);
          localStorage.setItem("token", token);
          const userId = response.data.user.id
          for (var i = 0; i < products.length; i++) {
            console.log('entre')
            var cant = Object.values(JSON.parse(localStorage.getItem("cart"))).map((id) => parseInt(id));
            await axios({
              method: "POST",
              url: `http://localhost:3001/users/${userId}/cart`,
              data: {
                productId: products[i].id,
                quantity: cant[i],
                price: products[i].price,
              },
            });
          }
        }
      })
      .then((response) => {
        history.goBack()
        alert("Logueado exitosamente");
        localStorage.removeItem("cart");
        // reloadPage()
      })
      .catch(err => console.log(err));
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `http://localhost:3001/auth/login`,
      data: userValues
    })
      .then(async response => {
        await setUserId(response.data.user)
        const reset = await response.data.user.resetPassword
        if (reset) {
          setOpen(true) 
        } else {
          
          var token = JSON.stringify(response.data.token);
          localStorage.setItem("token", token);
          alert("Logueado exitosamente");
            
        }
      })
      .catch((err) => {
        alert("Usuario no pudo ser logueado");
      });
  };

  const handleClickPassword = async () => {
  axios.put(`http://localhost:3001/users/changePassword/${userId.id}`,{
      password: userValues.newPassword
    }).then(response => {
      userId.resetPassword = false
      return axios({
            method: 'PUT',
            url: `http://localhost:3001/users/${userId.id}`,
            data: userId
        }).then(response => {
            alert('Tu contraseña fue cambiada con exito')
            window.location.reload();
        })
        .catch(err => console.log(err))
      })
  };

  return (
    <div>
      <form
        onSubmit={products.length > 0 ? handleSubmit1 : handleSubmit2}
        className="registerForm"
      >
        <h2>¡INICIA SESIÓN!</h2>
        <div className="full">
          <label>email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className=""
            value={userValues.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="full">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className=""
            value={userValues.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit"> listo </button>
        <GoogleLogin
          clientId="331906622861-24v12pd98kb4chd3qidlptk3jmdpgkch.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={okGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />,
      </form>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Cambia tu contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>
              Por seguridad debes cambiar tu contraseña
          </DialogContentText>
          <TextField autoFocus margin="dense" name='newPassword' label="Nueva contraseña" value={userValues.newPassword} type="password" fullWidth onChange={handleInputChange}/>
          {errors.newPassword ? <FormHelperText id="my-helper-text">{errors.newPassword}</FormHelperText> : null }
          <TextField autoFocus margin="dense" name='repeatNewPassword' label="Repetir nueva contraseña" value={userValues.repeatNewPassword} type="password" fullWidth onChange={handleInputChange}/>
          {errors.repeatNewPassword ? <FormHelperText id="my-helper-text">{errors.repeatNewPassword}</FormHelperText> : null }
        </DialogContent>
        {
            !errors.newPassword && !errors.repeatNewPassword && (
                <div>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickPassword} color="primary">
            Aceptar
          </Button>
        </DialogActions>
                </div>
            )
        }
      </Dialog>
    </div>
  );
}

export default LogInForm;
