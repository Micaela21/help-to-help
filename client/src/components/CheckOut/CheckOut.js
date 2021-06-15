import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  FormHelperText,
  Input,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";
import { ColumnsToolbarButton } from "@material-ui/data-grid";

export const validate = (userValues) => {
  let errors = {};

  if (!userValues.provincia) {
    errors.provincia = "Requerido";
  } else if (
    !/^[ _0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+( _\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1_ ]+$/i.test(
      userValues.provincia
    )
  ) {
    errors.provincia = "Solo letras";
  }
  if (!userValues.localidad) {
    errors.localidad = "Requerido";
  } else if (
    !/^[ _0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+( _\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1_ ]+$/i.test(
      userValues.localidad
    )
  ) {
    errors.localidad = "Solo letras";
  }
  if (!userValues.calle) {
    errors.calle = "Requerido";
  } else if (
    !/^[ _0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+( _\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1_ ]+$/i.test(
      userValues.calle
    )
  ) {
    errors.calle = "Solo letras";
  }

  if (!userValues.codigoPostal) {
    userValues.codigoPostal = "Requerido";
  } else if (!/^[0-9]+$/i.test(userValues.codigoPostal)) {
    userValues.codigoPostal = "Solo numeros";
  }
  if (!userValues.numero) {
    userValues.numero = "Requerido";
  } else if (!/^[0-9]+$/i.test(userValues.numero)) {
    userValues.numero = "Solo numeros";
  }

  return errors;
};

function CheckOutdata() {
  const [user, setUser] = useState(false);
  const [userValues, setUserValues] = useState({
    codigoPostal: "",
    provincia: "",
    localidad: "",
    calle: "",
    numero: "",
    pisodpto: "",
  });
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState(false)
  const handleInputChange = (e) => {
    e.preventDefault();
    setUserValues({
      ...userValues,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...userValues,
        [e.target.name]: e.target.value,
      })
    );
  };

  useEffect(() => {
    localStorage.getItem("token") && setUser(true);
  });

  useEffect(()=>{

  const authAxios = axios.create({
    baseURL: `http://localhost:3001`,
    headers: {
      Authorization: ` Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });

  authAxios.get(`/auth/me`).then((result) => {
    let id = result.data.id;
    axios({
      method: "GET",
      url: `http://localhost:3001/users/${id}/info`,
      data: userValues,
    }).then((response) => {
      if(response.data.address ){
        setAddress(true)
        
      }
    });
  });
},[])

  const handleSubmit = () => {
    const authAxios = axios.create({
      baseURL: `http://localhost:3001`,
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    authAxios.get(`/auth/me`).then((result) => {
      let id = result.data.id;
      axios({
        method: "POST",
        url: `http://localhost:3001/users/${id}/address`,
        data: userValues,
      }).then((response) => {
        // console.log(response);
      });
    });
  };

  // const handleSubmit2=()=>{
  //   const authAxios = axios.create({
  //     baseURL: `http://localhost:3001`,
  //     headers: {
  //       Authorization: ` Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  //     },
  //   });

  //   authAxios({
  //     method: "POST",
  //     url: `http://localhost:3001/checkout`
  //   })
  //   .then(response=>{window.location.href = response.data})
  // }
  const handleSubmit2=()=>{
    const authAxios = axios.create({
      baseURL: `http://localhost:3001`,
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
  let id
    authAxios.get(`/auth/me`).then((result) => {
      id = result.data.id;
     axios({
       method: "GET",
       url: `http://localhost:3001/users/${id}/info`,
       data: userValues,
      }).then( async (response) => {
        console.log(response)
        await date(response.data.orders[0].id)
      });
    })

    authAxios({
      method: "POST",
      url: `http://localhost:3001/checkout`
    })
    .then( response=>{
      // console.log(response)
      
      window.location.href = response.data
    })}

    async function date(id) {
      console.log(id)
      var currentdate = new Date();
      var datetime = await
        "Fecha : " +
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " Hora: " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
        console.log(datetime)
      axios({
        method: "PUT",
        url: `http://localhost:3001/orders/${id}`,
        data: {date: datetime},
      })
    }



  return (
   
    <div>
      <form>
        
        <h2>Agrega tu domicilio</h2>

        <FormControl className="inputCnt">
          <InputLabel htmlFor="codigoPostal">C.P.</InputLabel>
          <Input
            type="text"
            name="codigoPostal"
            value={userValues.codigoPostal}
            onChange={handleInputChange}
          />
          {errors.codigoPostal ? (
            <FormHelperText id="my-helper-text">
              {errors.codigoPostal}
            </FormHelperText>
          ) : null}
        </FormControl>

        <FormControl className="inputCnt">
          <InputLabel htmlFor="provincia">Provincia</InputLabel>
          <Input
            type="text"
            name="provincia"
            value={userValues.provincia}
            onChange={handleInputChange}
          />
          {errors.provincia ? (
            <FormHelperText id="my-helper-text">
              {errors.provincia}
            </FormHelperText>
          ) : null}
        </FormControl>

        <FormControl className="inputCnt">
          <InputLabel htmlFor="localidad">Localidad</InputLabel>
          <Input
            type="text"
            name="localidad"
            value={userValues.localidad}
            onChange={handleInputChange}
          />
          {errors.localidad ? (
            <FormHelperText id="my-helper-text">
              {errors.localidad}
            </FormHelperText>
          ) : null}
        </FormControl>

        <FormControl className="inputCnt">
          <InputLabel htmlFor="calle">Calle</InputLabel>
          <Input
            type="text"
            name="calle"
            value={userValues.calle}
            onChange={handleInputChange}
          />
          {errors.calle ? (
            <FormHelperText id="my-helper-text">{errors.calle}</FormHelperText>
          ) : null}
        </FormControl>

        <FormControl className="inputCnt">
          <InputLabel htmlFor="numero">Numero</InputLabel>
          <Input
            type="text"
            name="numero"
            value={userValues.numero}
            onChange={handleInputChange}
          />
          {errors.numero ? (
            <FormHelperText id="my-helper-text">{errors.numero}</FormHelperText>
          ) : null}
        </FormControl>

        <FormControl className="inputCnt">
          <InputLabel htmlFor="pisodpto">Piso/Dpto "(opcional)"</InputLabel>
          <Input
            type="text"
            name="pisodpto"
            value={userValues.pisodpto}
            onChange={handleInputChange}
          />
        </FormControl>
        {!errors.pais &&
        !errors.codigoPostal &&
        !errors.provincia &&
        !errors.localidad &&
        !errors.calle &&
        !errors.numero &&
        userValues.pisodpto ? (
          <Button variant="contained" onClick={handleSubmit}>
            actualizar
          </Button>
        ) : null}
          <br/>
        

           <Button variant="contained" onClick={handleSubmit2}>
          Siguiente
        </Button>
        
      </form>
      
    </div>
  );
}
export default CheckOutdata;
