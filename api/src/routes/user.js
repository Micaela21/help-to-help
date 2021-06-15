const server = require("express").Router();
const passport = require("passport");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

const { Order, OrderLine, User, Product, Address } = require("../db.js");


//Ruta para devolver todos los usuarios y sus ordenes
server.get("/", (req, res, next) => {
  User.findAll({ include: [{ model: Order }, { model: Address }], })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
});

//ruta para buscar info de un user en particular
server.get("/:id/info", (req, res, next) => {
  User.findOne({
    where: { id: req.params.id },
    include: [{ model: Order}, {model: Address }]
  })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
});

//ruta para vaciar el carrito: DELETE /users/:idUser/cart/
server.delete("/:idUser/cart", (req, res, next) => {
  User.findByPk(req.params.idUser, { include: { model: Order } })
    .then((user) => {
      Order.destroy({
        where: {
          state: "cart",
        },
      });
    })
    .then(res.send("El carrito está vacío"))
    .catch(next);
});

//ruta para editar las cantidades del carrito: PUT /users/:idUser/cart
/*...poder seguir editando el mismo carrito que tenia como invitado 
si me creo una cuenta, 
asi no pierdo los items seleccionados.*/

server.put("/:userId/cart", (req, res, next) => {
  const { price, quantity, productId } = req.body;
  const { userId } = req.params;
  Order.findOne({
    where: {
      userId: userId,
      state: "cart",
    },
  })
    .then((response) => {
      const orderId = response.id;
      return OrderLine.update(
        {
          quantity: quantity,
          price: price,
        },
        {
          where: {
            orderId: orderId,
            productId: productId,
          },
        }
      );
    })
    .then((response) => res.json(response))
    .catch(next);
});

//Ruta para agregar items al carrito, crear linea de orden
server.post("/:userId/cart", async (req, res, next) => {
  var orderId;

  const order = await Order.findOrCreate({
    where: {
      userId: req.params.userId,
      state: "cart",
    },
  });
  orderId = order[0].id;
  const orderLine = await OrderLine.create({
    orderId: orderId,
    productId: req.body.productId,
    quantity: req.body.quantity,
    price: req.body.price,
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(next);
});

//Ruta para traer todos los productos del carrito
server.get("/:idUser/cart", (req, res, next) => {
  const id = req.params.idUser;
  Order.findAll({
    where: {
      userId: id,
      state: "cart",
    },
    include: [{ model: Product, as: "products" }],
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(next);
});

//Ruta para crear usuario
server.post("/", (req, res, next) => {
  const {
    userName,
    email,
    firstName,
    lastName,
    password,
    osName,
    osWeb,
  } = req.body;
  if (!osName) {
    User.create({
      userName: userName,
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    })
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch(next);
  } else {
    User.create({
      userName: userName,
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      osName: osName,
      osWeb: osWeb,
    })
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch(next);
  }
});

// Task S36: Crear Ruta que retorne todos los Usuarios
server.get("/", (req, res, next) => {
  User.findAll()
    .then((u) => {
      res.json(u);
    })
    .catch((err) => {
      res.send(err);
    });
});

// Task S35: Crear Ruta para modificar Usuario
server.put("/:id", (req, res, next) => {
  const {
    userName,
    email,
    firstName,
    lastName,
    osName,
    osWeb,
    role,
    active,
    resetPassword,
  } = req.body;
  User.update(
    {
      userName: userName,
      email: email,
      firstName: firstName,
      lastName: lastName,
      osName: osName,
      osWeb: osWeb,
      role: role,
      active: active,
      resetPassword: resetPassword,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(next);
});

// ruta para cambiar contraseña
server.put("/changePassword/:id", (req, res, next) => {
  const {password} = req.body
  User.update(
    {
      password: password
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(next);
});

// Task S37: Crear Ruta para eliminar Usuario
server.delete("/:id", (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "No se encontro un Usuario con ese id" });
      }
      user.destroy(user);
      return res.status(200).send(user);
    })
    .catch(next);
});

//Ruta para devolver todas las ordenes de un usuario
server.get("/:id/orders", (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Order }],
  }).then((response) => res.json(response.orders));
});

//Ruta para eliminar una order line
server.delete("/:id/cart/:orderLineId", (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) =>
      Order.findOne({
        where: {
          state: "cart",
          userId: user.id,
        },
        include: [{ model: Product }],
      })
    )
    .then((order) =>
      OrderLine.destroy({
        where: {
          productId: req.params.orderLineId,
          orderId: order.id,
        },
      })
    )
    .then((orderLine) =>
      User.findOne({
        where: {
          id: req.params.id,
        },
      })
    )
    .then((user) =>
      Order.findOne({
        where: {
          state: "cart",
          userId: user.id,
        },
        include: [{ model: Product }],
      })
    )
    .then((order) => res.send(order))
    .catch(next);
});

//Ruta para devolver solo OS
server.get("/os", (req, res, next) => {
  User.findAll({
    where: {
      role: "os",
    },
  }).then((response) => res.json(response));
});

//ruta para devolver las direcciones del User
server.get("/:id/address", (req, res) => {
  User.findByPk(req.params.id).then(
    (user) => {
      console.log(user)
      if (!user) {
        return res
          .status(404)
          .json({ message: "No se encontro usuario con ese id" });
      }
     return res.json(user.address);
    }
  );
});
//POST, ruta para agregar direccion
server.post("/:id/address", (req, res) => {
  var usuario;
  const {

    codigoPostal,
    provincia,
    localidad,
    calle,
    numero,
    pisodpto
  } = req.body;
  User.findByPk(req.params.id, { include: { model: Address } }).then(
    (user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "No se encontro usuario con ese id" });
      } if (user.address) {
        return res
          .status(404)
          .json({ message: "el user ya tiene direccion" })
      } else {
        usuario = user;
        return Address.create({

          codigoPostal,
          provincia,
          localidad,
          calle,
          numero,
          pisodpto,
        })
      };
    })
    .then(newAddress => {
      return newAddress.setUser(usuario.id)
    })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

//PUT, modificar direccion
server.put("/:id/address/:idAddress", (req, res) => {
  const {

    codigoPostal,
    provincia,
    localidad,
    calle,
    numero,
    pisodpto
  } = req.body;
  var user;
  User.findByPk(req.params.id, { include: { model: Address } })
    .then((usuario) => {
      user = usuario;
      if (!usuario) {
        return res
          .status(404)
          .json({ message: "No se encontro Usuario con ese id" });
      }
      return Address.findByPk(req.params.idAddress);
    })
    .then((address) => {
      console.log("sdadsadsadsadadad", user.id)

      if (!address || address.userId !== user.id) {
        return res
          .status(404)
          .json({ message: "No se encontro direccion con ese id" });
      } else {
        a = address;

        address.codigoPostal = codigoPostal;
        address.provincia = provincia;
        address.localidad = localidad;
        address.calle = calle;
        address.numero = numero;
        address.pisodpto = pisodpto;
        return a.save()
      }
    })

    .then((result) => {
      res.status(200).send("direccion cambiada correctamente");
      return;
    });
})

server.get("/google/:email", (req, res, next) => {
  User.findOne({
    where: {
      email: req.params.email,
    }
  })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch(next);

});





server.post("/nuevoRegistro", (req, res) => {
  const output = `
  <p>Felicidades ${req.body.firstName},acabas de registrarte en ElMejorE-Commerce.com</p>
  <h3>Informacion de cuenta</h3>
  <ul>
    <li> e-Mail: ${req.body.email}</il>
    <li> Usuario: ${req.body.userName}</il>
    <li> Nombre: ${req.body.firstName}</il>
    <li> Apellido: ${req.body.lastName}</il>
  </ul>
  `;

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "isabella.schaden90@ethereal.email", // generated ethereal user
      pass: "HuGPN7uUvgs57cCJyE", // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  let mailOptions = {
    from: `"ElMejorE-Commerce@gmail.com" <isabella.schaden90@ethereal.email>`, // sender address
    to: `${req.body.email}`, // list of receivers
    subject: `Felicidades ${req.body.firstName}, acabas de registrarte con éxito!`, // Subject line
    text: `Felicidades ${req.body.firstName}! Acabas de registrarte exitosamente en ElMejorE-Commerce.com`, // plain text body
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
});





server.post("/changePassword", (req, res) => {
  const output = `
  
  <h3>Tienes que cambiar tu contraseña en ElMejorE-Commerce.com</h3>
  <p>
    la proxima vez que intentes loguearte en la web deberás cambiar tu contraseña.
    Tranquil@! No es tu culpa, son simplemente medidas de seguridad para protegerte a ti y a tu cuenta.
  </p>
  `;

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "isabella.schaden90@ethereal.email", // generated ethereal user
      pass: "HuGPN7uUvgs57cCJyE", // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  let mailOptions = {
    from: `"ElMejorE-Commerce@gmail.com" <isabella.schaden90@ethereal.email>`, // sender address
    to: `${req.body.email}`, // list of receivers
    subject: `Tienes que cambiar tu contraseña en ElMejorE-Commerce.com`, // Subject line
    text: `Tienes que cambiar tu contraseña en ElMejorE-Commerce.com`, // plain text body
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
});




server.post("/banMail", (req, res) => {
  const output = `
  
  <h3>Has sido Baneado de ElMejorE-Commerce.com</h3>
  
  `;

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "isabella.schaden90@ethereal.email", // generated ethereal user
      pass: "HuGPN7uUvgs57cCJyE", // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  let mailOptions = {
    from: `"ElMejorE-Commerce@gmail.com" <isabella.schaden90@ethereal.email>`, // sender address
    to: `${req.body.email}`, // list of receivers
    subject: `Has sido Baneado de ElMejorE-Commerce.com`, // Subject line
    text: `Has sido Baneado de ElMejorE-Commerce.com`, // plain text body
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
});



server.post("/userRoleMail", (req, res) => {
  const output = `
  <h3>Felicidades! El rol de tu cuenta fue modificado a ${req.body.role}</h3>
  `;

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "isabella.schaden90@ethereal.email", // generated ethereal user
      pass: "HuGPN7uUvgs57cCJyE", // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  let mailOptions = {
    from: `"ElMejorE-Commerce@gmail.com" <isabella.schaden90@ethereal.email>`, // sender address
    to: `${req.body.email}`, // list of receivers
    subject: `El rol de tu usuario de ElMejorE-Commerce.com fue modificado`, // Subject line
    text: `Felicidades! El rol de tu cuenta fue modificado a ${req.body.role}`, // plain text body
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
});

module.exports = server;
