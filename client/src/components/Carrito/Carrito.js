import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cart, getProducts } from "../../Actions/Actions";
import "./Carrito.css";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import OrderLine from "./OrderLine";
import BuyResult from "./BuyResult";
import BuyTotal from "./BuyTotal";
import ProductCard from "../ProductCard/ProductCard";

const Carrito = () => {
  const dispatch = useDispatch();
  var carritoUser = useSelector((store) => store.cart);
  const [open, setOpen] = useState(false);
  const products = useSelector((state) => state.getAllProducts);
  const [user, setUser] = useState();
  const [state, setState] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  const handleClickCart = () => {
    if (localStorage.getItem("cart")) {
      localStorage.removeItem("cart");
      alert("Tu carrito está vacío");
    } else {
      authAxios.get(`/auth/me`).then((response) => {
        axios({
          method: "DELETE",
          url: `http://localhost:3001/users/${response.data.id}/cart`,
        }).then((response) => {
          alert("Tu carrito está vacío");
          window.location.reload();
          return false;
        });
      });
    }
  };

  let authAxios;
  useEffect(() => {
    authAxios = axios.create({
      baseURL: "http://localhost:3001",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
  }, [state]);

  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.getItem("token") && setState(true);
      authAxios.get("/auth/me").then((response) => {
        setUser(response.data.id)
        return dispatch(cart(response.data.id));
      });
    }
  }, []);

  var total = 0;
  const suma = carritoUser.map((obj) => (
    total += obj.OrderLine.quantity * obj.price
    ))

  return (
    <div className="backg">
      <div className="carroConteinerPro">
        <div className="carroTitleLink">
          <div className="flexRow">
            <h2>MI CARRITO</h2>
            {!localStorage.getItem("cart") || carritoUser === [] ? null : (
              <Link to="/">
                <button
                  className="vaciarBtn semiBold montserrat primary"
                  onClick={handleClickCart}
                >
                  VACIAR CARRITO
                </button>
              </Link>
            )}
          </div>
          <Link to="/catalogue">
            <button className="vaciarBtn semiBold montserrat primary">
              SEGUIR COMPRANDO
            </button>{" "}
          </Link>
        </div>

        <div id="generalConteiner" className="carroBody">
          <div className="produ">
            {localStorage.cart
              ? Object.keys(
                  JSON.parse(localStorage.getItem("cart"))
                ).map((id) => (
                  <OrderLine
                    id={id}
                    quantity={JSON.parse(localStorage.getItem("cart"))[id]}
                  />
                ))
              : carritoUser.map((obj) => (
                  <OrderLine
                    id={obj.id}
                    quantity={obj.OrderLine.quantity}
                    userId={user}
                  />
                ))}
          </div>
          <div>
            <div className="resultContainer">
              <h3>RESUMEN DE LA COMPRA</h3>
              {localStorage.cart
              ? Object.keys(JSON.parse(localStorage.getItem("cart"))).map((id) => (
                  <BuyResult id={id} quantity={JSON.parse(localStorage.getItem("cart"))[id]}/>))
              : carritoUser.map((obj) => (
                <BuyResult id={obj.id} quantity={obj.OrderLine.quantity} price={obj.OrderLine.price}/>
              ))
              }

              <hr />
              <div className="carroDescuento">
                <h5 className="semiBold">Descuentos</h5>
                <h5 className="semiBold">$ 0.00</h5>
              </div>

              <hr />
              <div className="carroTotal">
                <h4>Total</h4>
            <h5>${total}</h5>
              </div>
              {localStorage.cart ? (
                <div className="mrgn">
                  <button
                    className="carroBtn bold primary"
                    onClick={handleClickOpen}
                  >
                    PROCEDER AL PAGO
                  </button>
                </div>
              ) : (
                <div className="mrgn">
                  <Link to="/checkout">
                    <button className="carroBtn bold primary">
                      PROCEDER AL PAGO
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <div className="barraCarrito">
              <h4>ESTO PUEDE INTERESARTE</h4>
              <div className="col">
                {products?.map((product) => {
                  return <ProductCard product={product} />;
                })}
              </div>
            </div>
          </div>
          <Dialog
            variant="outlined"
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            className={"exterior"}
          >
            <DialogActions>
              <Link to="/logIn">
                <Button autoFocus onClick={handleClose} className={"buttonc"}>
                  <span className={"text"}>Ingresar con mi cuenta</span>
                </Button>
              </Link>
            </DialogActions>
            <DialogActions>
              <Link to="/logIn">
                <Button autoFocus onClick={handleClose} className={"buttonc"}>
                  <span className={"text"}>Registrarme</span>
                </Button>
              </Link>
            </DialogActions>
            {/* <DialogActions>
              <Link to="/guest">
                <Button autoFocus onClick={handleClose} className={"buttonc"}>
                  <span className={"text"}>
                    Continuar la compra como invitado
                  </span>
                </Button>
              </Link>
            </DialogActions> */}
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
