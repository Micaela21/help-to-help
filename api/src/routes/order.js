const server = require("express").Router();

const { Product, Category, User, Order, OrderLine } = require("../db.js");

//ruta que devuelve todas las ordenes
server.get("/all", (req, res, next) => {
  Order.findAll().then((response) => res.json(response));
});


// Ruta para devolver todas las ordenes por status
server.get("/", (req, res, next) => {
  Order.findAll({
    where: {
      state: req.query.status,
    },
    include: [{model: Product}]
  }).then((response) => res.json(response));
});

//Ruta para devolver una orden en particular
server.get("/:id", (req, res, next) => {
  Order.findAll({
    where: {
      id: req.params.id,
    },
    include: [{model: Product}]
  }).then((response) => res.json(response));
});

server.put('/:orderId', (req, res, next) => {
  const {orderId} = req.params;
  const {userId, status, date} = req.body;
  Order.update({
    state: status,
    userId: userId,
    date: date
  },{
    where: {
      id: orderId
    }
  }).then(response => res.json(response))
})


module.exports = server;
