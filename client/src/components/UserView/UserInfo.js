import React, { useState } from "react";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Button, TextField } from "@material-ui/core";
import "./UserInfo.css";

export default function UserInfo() {
  const [dis, setDis] = useState(true);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    osName: "",
    osWeb: "",
    showPassword: false,
  });
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setUser({ ...user, showPassword: !user.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="userInfo">
      <TextField
        className="bla"
        required
        id="outlined-required"
        label="Nombre de Usuario"
        variant="outlined"
        defaultValue="pepe99"
        name="userName"
        onChange={handleChange}
        disabled={dis}
      />
      <TextField
        className="bla"
        required
        id="outlined-required"
        label="Nombre"
        variant="outlined"
        defaultValue="Juan"
        name="firstName"
        onChange={handleChange}
        disabled={dis}
      />
      <TextField
        className="bla"
        required
        id="outlined-required"
        label="Apellido"
        variant="outlined"
        defaultValue="Perez"
        name="lastName"
        onChange={handleChange}
        disabled={dis}
      />
      <TextField
        className="bla"
        required
        id="outlined-required"
        label="Email"
        variant="outlined"
        defaultValue="juan1999@gmail.comasdasdasdasdasdasd"
        name="email"
        onChange={handleChange}
        disabled={dis}
      />
      <FormControl className="formPass" variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          Contraseña
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={user.showPassword ? "text" : "password"}
          name="password"
          defaultValue="123456"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              {!dis && (
                <IconButton
                  onClick={handleClickShowPassword}
                  aria-label="toggle password visibility"
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {user.showPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              )}
            </InputAdornment>
          }
          labelWidth={70}
          disabled={dis}
        />
      </FormControl>
      <TextField
        className="bigs"
        required
        id="outlined"
        label="Nombre de la Organizacion Social"
        variant="outlined"
        defaultValue="Ayudando Patitas"
        name="osName"
        onChange={handleChange}
        disabled={dis}
      />
      <TextField
        className="bigs"
        required
        id="outlined"
        label="Pagina web de la Organizacion Social"
        variant="outlined"
        defaultValue="www.ayudando-patitas.com.ar"
        name="osName"
        onChange={handleChange}
        disabled={dis}
      />
      <div className="buttonsUser">
        <Button
          className="buttonUser"
          variant="contained"
          onClick={() => setDis(!dis)}
        >
          Editar
        </Button>
        <Button
          className="buttonUser"
          variant="contained"
          onClick={() => setDis(true)}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}
