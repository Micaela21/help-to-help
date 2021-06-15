import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import UserCard from "./UserCard";

const columns = [
  { field: "id", headerName: "Id", flex: 0.4 },
  { field: "user", headerName: "User", flex: 0.8 },
  { field: "name", headerName: "User", flex: 1 },
  { field: "role", headerName: "Role", flex: 1 },
];

export default function UserTableAdmin() {
  const [users, setUsers] = useState();
  const [row, setRow] = useState();
  const [close, setClose] = useState(true);
  let aux = [];

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3001/users/",
    }).then((res) => {
      setUsers(res.data);
    }).then(() => prepareRows())
  }, []);

  const prepareRows = () => {
    aux = users?.map((el) => {
      return {
        id: el.id,
        user: el.userName,
        name: el.firstName +" "+ el.lastName,
        role: el.role
      }
    });
  };

  const handleRowClick = (rowParams) => {
    setRow(rowParams.row);
    setClose(true);
  };
  const handleClose = () => {
    setClose(false);
  };
  return (
    <div>
     {users && prepareRows()}
      <div className="dataTable">
        <div className={"table"} style={{ height: 400 }}>
          <DataGrid
            rows={aux}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick={true}
            onRowClick={(rowParams) => handleRowClick(rowParams)}
          />
        </div>
      </div>
      <div className="userInfo">
        {close && row && (
          <UserCard user={row} handleClose={handleClose} />
        )}
      </div>
    </div>
  );
}
