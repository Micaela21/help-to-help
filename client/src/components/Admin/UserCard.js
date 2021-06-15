import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import "./UserCard.css";

function UserCard({ user, handleClose }) {
  const [role, setRole] = useState(); //selected role
  const [defRole, setDefRole] = useState(); //default role
  const [currUser, setCurrUser] = useState(); //current user

  const roles = [
    { value: "user", label: "User" },
    { value: "os", label: "Organizacion Social" },
    { value: "admin", label: "Administrador" },
  ];

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3001/users/${user.id}/info`,
    }).then(async (res) => {
      console.log(res.data);
      let upperRole =
        (await res.data.role.charAt(0).toUpperCase()) +
        res.data.role.slice(1);
      await setDefRole({ value: "default", label: upperRole });
      await setCurrUser(res.data);
    });
  }, []);

  const handleSelect = async (selectedOption) => {
    await setRole(selectedOption);
  };

  const submitRole = () => {
    var body = currUser;
    currUser.role = role.value;
    // console.log(currUser);
    axios({
      method: "PUT",
      url: `http://localhost:3001/users/${currUser.id}`,
      data: currUser,
    })
    .then( response => {
      axios({
        method: 'POST',
        url: `http://localhost:3001/users/userRoleMail`,
        data: body,
      })
    })
  };

  const submitBan = () => {
    var body = currUser;
    currUser.active = false;
    axios({
      method: "PUT",
      url: `http://localhost:3001/users/${currUser.id}`,
      data: currUser,
    })
    .then( response => {
      axios({
        method: 'POST',
        url: `http://localhost:3001/users/banMail`,
        data: body,
      })
    })
    
  };

  const submitReset = () => {
    var body = currUser;
    console.log(currUser);
    currUser.resetPassword = true;
    console.log(currUser)
    axios({
      method: "PUT",
      url: `http://localhost:3001/users/${currUser.id}`,
      data: currUser,
    })
    .then( response => {
      axios({
        method: 'POST',
        url: `http://localhost:3001/users/changePassword`,
        data: body,
      })
    })
  };

  return (
    <div className="userCard">
      <div className="userCardHeader">
        <h3>
          Usuario {user.user}, id {user.id}
        </h3>
      </div>

      <div className="userCardBody">
        <div className="userCardBodyRole">
          <p>Rol del usuario</p>
          {defRole ? (
            <Select
              options={roles}
              defaultValue={defRole}
              onChange={handleSelect}
              className="roleSelect"
            />
          ) : null}
          <Button
            variant="contained"
            onClick={() => {
              const alert = window.confirm(
                "¿Seguro que quieres cambiar el rol de este usuario?"
              );
              if (alert) {
                submitRole();
              }
            }}
            size="small"
          >
            Aceptar
          </Button>
        </div>

        <div className="userCardBodyBan">
          <p>Banear usuario (prohibir acceso)</p>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => {
              const alert = window.confirm(
                "¿Seguro quieres prohibir el acceso a este usuario?"
              );
              if (alert) {
                submitBan();
              }
            }}
          >
            BANEAR
          </Button>
        </div>

        <div className="userCardBodyReset">
          <p>Solicitar cambio de contraseña</p>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              const alert = window.confirm(
                "¿Seguro quieres solicitar un cambio de contraseña a este usuario?"
              );
              if (alert) {
                submitReset();
              }
            }}
          >
            Solicitar
          </Button>
        </div>
      </div>

      <div className="userCardButtons">
        <Button
          variant="contained"
          onClick={handleClose}
        >
          Volver
        </Button>
      </div>
    </div>
  );
}

export default UserCard;
