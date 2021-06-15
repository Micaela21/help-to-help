import React from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import "./OrderCard.css";
import StatusStepper from "./StatusStepper";

function OrderCard({ row, handleClose }) {
  return (
    <div className="orderCard">
      <div className="headerCard">
        <h3>Numero de orden: {row.id}</h3>
        <div className="close">
          <CancelIcon onClick={handleClose} />
        </div>
      </div>
      <div className="body">
        <h4>Cliente: {row.user}</h4>
        <h4>Informacion de la orden:</h4>
        {row && row.allItems.map((el) => {
          return (
            <div key={el.id} >
              Nombre del producto: {el.name}, id: {el.id}. Descripcion:{" "}
              {el.description}.Precio unitario: ${el.price}. Cantidad: {el.quantity}
            </div>
          );
        })}
        <p>Total: ${row.amount}</p>
      </div>
      <StatusStepper status={row.status} id={row.id} userId={row.userId} />
    </div>
  );
}

export default OrderCard;
