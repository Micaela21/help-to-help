import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./DataTable.css";
import OrderCard from "./OrderCard";

const columns = [
  { field: "id", headerName: "Order", flex: 0.4 },
  { field: "user", headerName: "User", flex: 0.8 },
  { field: "items", headerName: "Items", flex: 1 },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    flex: 0.4,
  },
  { field: "status", headerName: "Status", flex: 0.8 },
];

const rows = [
  {
    id: 1,
    items: "hueso",
    user: "Jon",
    amount: 70,
    status: "pago pendiente",
  },
  {
    id: 2,
    items: "correa",
    user: "Cersei",
    amount: 50,
    status: "pago rechazado",
  },
  {
    id: 3,
    items: "bebedero",
    user: "Jaime",
    amount: 150,
    status: "pago aprobado",
  },
  {
    id: 4,
    items: "alimento adulto",
    user: "Arya",
    amount: 450,
    status: "pago pendiente",
  },
  {
    id: 5,
    items: "pelota chica",
    user: "Daenerys",
    amount: 250,
    status: "pago rechazado",
  },
  {
    id: 6,
    items: "alimento cachorro",
    user: "John",
    amount: 150,
    status: "pago aprobado",
  },
  {
    id: 7,
    items: "antiparasitario",
    user: "Ferrara",
    amount: 45,
    status: "pago rechazado",
  },
  {
    id: 8,
    items: "cucha de madera",
    user: "Rossini",
    amount: 600,
    status: "pago pendiente",
  },{
    id: 9,
    items: "cucha de madera",
    user: "Rossini",
    amount: 600,
    status: "pago pendiente",
  },{
    id: 10,
    items: "cucha de madera",
    user: "Rossini",
    amount: 600,
    status: "pago pendiente",
  },{
    id: 11,
    items: "cucha de madera",
    user: "Rossini",
    amount: 600,
    status: "pago pendiente",
  },{
    id: 12,
    items: "cucha de madera",
    user: "Rossini",
    amount: 600,
    status: "pago pendiente",
  },
];
export default function DataTable() {
  const [row, setRow] = useState();
  const [close, setClose] = useState(true);
  const handleRowClick = (rowParams) => {
    setRow(rowParams.row);
    setClose(true);
  };
  const handleClose = () => {
    setClose(false);
  };
  return (
    <div>
      <div className="dataTable">
        <div className={"table"} style={{ height: 700 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick={true}
            onRowClick={(rowParams) => handleRowClick(rowParams)}
          />
        </div>
      </div>
      <div className="orderInfo">
        {close && row && (
          <OrderCard row={row} handleClose={handleClose} />
        )}
      </div>
    </div>
  );
}
