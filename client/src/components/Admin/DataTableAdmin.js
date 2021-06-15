import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./DataTableAdmin.css";
import OrderCard from "./OrderCard";
import axios from "axios";

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

export default function DataTableAdmin() {
  const [row, setRow] = useState(); //row para rowCard
  const [close, setClose] = useState(true); //boolean para cerrar rowCard
  const [orders, setOrders] = useState();
  const [rows, setRows] = useState([]); //orders + users para renderizar table
  let fullOrder = [];
  let aux = [];
  let orderArr = [];
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3001/orders/all",
    })
      .then((res) => {
        setOrders(res.data);
        orderArr = res.data;
      })
      .then(async () => {
        for (let i in orderArr) {
          await axios({
            method: "GET",
            url: `http://localhost:3001/orders/${orderArr[i].id}`,
          }).then((res) => {
            fullOrder.push(res.data[0]);
            axios({
              method: "GET",
              url: `http://localhost:3001/users/${fullOrder[i]?.userId}/info`,
            }).then((user) => {
              setRows((old) => [
                ...old,
                {
                  id: fullOrder[i].id,
                  user:
                    user.data.firstName + " " + user.data.lastName,
                  items: [...fullOrder[i].products],
                  status: fullOrder[i].state,
                  userId: fullOrder[i].userId,
                },
              ]);
            });
          });
        }
      });
  }, []);

  const handleRowClick = (rowParams) => {
    setRow(rowParams.row);
    setClose(true);
  };
  const handleClose = () => {
    setClose(false);
  };

  const prepareRows = (rows) => {
    aux = rows.map((row) => {
      let acum = 0;
      function aa(arg) {
        arg.forEach((el) => {
          acum += el.OrderLine.quantity * el.OrderLine.price;
        });
        return acum;
      }
      return {
        id: row.id,
        user: row.user,
        userId: row.userId,
        allItems: row.items.map((el) => ({
          id: el.id,
          name: el.name,
          price: el.price,
          description: el.description,
          quantity: el.OrderLine.quantity,
        })),
        items: row.items.map((el) => el.name).toString(),
        amount: aa(row.items),
        status: row.status,
      };
    });
  };

  return (
    <>
    {/* {console.log(rows)} */}
      {rows && prepareRows(rows)}
      <div className="dataTable">
        <div className={"table"} style={{ height: 390 }}>
          <DataGrid
            rows={aux}
            columns={columns}
            pageSize={5}
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
    </>
  );
}
