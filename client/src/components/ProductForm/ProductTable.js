import React from "react";
import Button from "@material-ui/core/Button";
import { Card } from "@material-ui/core";
import "./ProductTable.css";

export default function ProductTable({
  product,
  handleDelete,
  handleEdit,
}) {
  //   const classes = useStyles();
  // console.log(product)
  return (
    <Card className="newCard">
      <div className="imageDiv">
        <img
          src={`${product.image}`}
          alt="imagen"
          style={{
            width: 220,
            height: 165.9,
            backgroundColor: "transparent",
          }}
        />
      </div>
      <div className="body">
        <h4>ID: {product.id}</h4>
        <h5>{product.name}</h5>
      </div>
      <div className="buttons">
        {/* DESPACHAR ACCION  */}
        <Button
          variant="contained"
          onClick={() => handleEdit(product)}
        >
          Editar
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            const alert = window.confirm(
              "¿Seguro quieres eliminar este producto?"
            );
            if (alert) {
              handleDelete(product.id);
            }
          }}
        >
          Eliminar
        </Button>
      </div>
    </Card>
  );
}
