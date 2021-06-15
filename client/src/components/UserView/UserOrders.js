import React, { useEffect, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import "./UserOrders.css";

export default function SimpleAccordion() {
  const { id } = useParams();
  const [orders, setOrders] = useState();
  const [detail, setDetail] = useState();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (order, id) => (event, isExpanded) => {
    setExpanded(isExpanded ? order : false);
    axios({
      method: "GET",
      url: `http://localhost:3001/orders/${id}`,
    }).then((res) => {
      setDetail(res.data[0]);
    });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3001/users/${id}/orders`,
    }).then((res) => {
      setOrders(res.data);
    });
  }, []);

  let acum = 0;

  return (
    <div className="accordionContainer">
      {orders &&
        orders.map((el) => {
          return (
            <Accordion
              className="orderAccordion"
              expanded={expanded === `order${el.id}`}
              onChange={handleChange(`order${el.id}`, el.id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography ><h4 className="userOrderTitle">Orden numero {el.id}</h4></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div style={{ display: "none" }}>{(acum = 0)}</div>
                  <h4>Detalle:</h4>
                  {detail &&
                    detail.products.map((el) => {
                      {
                        acum +=
                          el.OrderLine.price * el.OrderLine.quantity;
                      }
                      return (
                        <div>
                          <p>
                            Producto; {el.name}, precio: $
                            {el.OrderLine.price}, cantidad{" "}
                            {el.OrderLine.quantity}
                          </p>
                          <Link to={{pathname: `/productDetail/${el.id}`, state: {status: detail}}}> Ver producto...</Link>
                         </div>
                      );
                    })}
                  {<h4>Total: ${acum}</h4>}
                  {detail && <h4>Estado: {detail.state}</h4>}
                  <h4> {detail?.date}</h4>
                  {/* {detail && console.log(detail.products)} */}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      {!orders ? <h3>El usuario no tiene ordenes</h3> : null}
    </div>
  );
}
