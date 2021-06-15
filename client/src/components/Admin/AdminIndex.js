import React from "react";
import "./index.css";
import AdminNavBar from "./AdminNavBar";
import SideBar from "./SideBar.js";
import { useParams } from "react-router";

const AdminIndex = () => {
  const {idUser} = useParams()
  return (
    <div className="">
      <AdminNavBar/>
      <SideBar id={idUser}/>
    </div>
  );
};

export default AdminIndex;
