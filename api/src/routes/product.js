const server = require("express").Router();
const { Product, Category, Image, Reviews } = require("../db.js");
const { Op } = require("sequelize");
const pluralize = require('pluralize');
//const { response } = require("express");

//get, trae todos los productos

server.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch(next);
});

//task S25
server.post("/", (req, res) => {
  const { name, description, price, stock, image } = req.body;
  if (!name || !description || !price || !stock) {
    return res.status(400);
  }
  Product.create({
    name: name,
    description: description,
    stock: stock,
    price: price,
    image: image,
  })
    .then((p) => {
      res.status(201).send(p);
    })
    .catch((err) => {
      console.log("error " + err);
    });
});

//task S26
server.put("/:id", (req, res) => {
  const { name, description, price, stock, image } = req.body;
  if (!name || !description || !price || !stock) {
    return res.status(400);
  }
  Product.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((p) => {
      prod = p;
      p.name = name;
      p.description = description;
      p.price = price;
      p.stock = stock;
      p.image = image;
      return prod.save();
    })
    .then(() => {
      res.status(200).send(prod);
    });
});

//task S27
server.delete("/:id", (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
  }).then((p) => {
    let prod = p;
    if (!p) {
      return res.status(400).send("error, producto no encontrado");
    }
    p.destroy()
      .then(() => {
        res.status(200).send(prod);
      })
      .catch((err) => {
        console.log("error" + err);
      });
  });
});

//post, agrega categoria a un productos
server.post("/:idProducto/category/:idCategoria", (req, res, next) => {
  console.log("req.params");
  Product.findByPk(req.params.idProducto)
    .then((product) => {
      if (!product) {
        return res
          .status(404)
          .json({ message: "No se encontro producto con ese id" });
      }
      Category.findByPk(req.params.idCategoria)
        .then((category) => {
          if (!category) {
            return res.status(404).json({
              message: "No se encontro categoria con ese id",
            });
          }
          product.addCategory(category);
          return res.status(200).send();
        })
        .catch(next);
    })
    .catch(next);
});

//delete, le borra categoria a un producto
server.delete("/:idProducto/category/:idCategoria", (req, res, next) => {
  console.log("req.params");
  Product.findByPk(req.params.idProducto)
    .then((product) => {
      if (!product) {
        return res
          .status(404)
          .json({ message: "No se encontro producto con ese id" });
      }
      Category.findByPk(req.params.idCategoria)
        .then((category) => {
          if (!category) {
            return res.status(404).json({
              message: "No se encontro categoria con ese id",
            });
          }
          product.removeCategory(category);
          return res.status(200).send();
        })
        .catch(next);
    })
    .catch(next);
});

//GET /search?query={valor}
//Retorna todos los productos que tengan {valor} en su nombre o descripcion.

server.get("/search", (req, res, next) => {
  let { keyword } = req.query;
  Product.findAll({
    where: {
      [Op.or]: [
        {
          name:  {[Op.or]: [{ [Op.iLike]: '%'+ keyword + '%' },
                { [Op.iLike]: pluralize.singular(keyword)}]
        }},
        {
          description: {[Op.or]: [{ [Op.iLike]: '%'+ keyword + '%' },
          { [Op.iLike]: pluralize.singular(keyword)}]
  }},
      ],
    },
  })
    .then((products) => {
      res.json(products);
    })
    .catch(next);
});

server.get("/getCategory", (req, res, next) => {
  Category.findAll()
    .then((c) => {
      res.json(c);
    })
    .catch((err) => {
      res.send(err);
    });
});

// //GET /products/:id
// //Retorna un objeto de tipo producto con todos sus datos. (Incluidas las categorías).
server.get("/:id", (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Category }],
  })
    .then((product) => res.json(product))
    .catch(next);
});

//get, trae productos de una categoria
server.get("/category/:nameCat", (req, res) => {
  Category.findOne({
    where: {
      name: req.params.nameCat,
    },
    include: { model: Product },
  }).then((result) => {
    // console.log(result);
    res.send(result.products);

    // res.json(result.products);
  });
});

//put, actualiza categoria
server.put("/category/:categoryId", (req, res, next) => {
  Category.update(
    {
      name: req.body.name,
    },
    {
      where: {
        id: req.params.categoryId,
      },
    }
  ).then((result) => {
    res.status(200).send();
    return;
  });
});

//post, crea categoria
server.post("/category", (req, res, next) => {
  const { name } = req.body;
  Category.create({ name: name })
    .then((category) => {
      return res.status(200).json(category);
    })
    .catch(next);
});

//delete, borra una categoria
server.delete("/category/:id", (req, res, next) => {
  Category.findByPk(req.params.id)
    .then((category) => {
      let cat = category;
      if (!category) {
        return res
          .status(404)
          .json({ message: "No se encontro categoria con ese id" });
      }
      category.destroy(category);
      return res.status(200).send(category);
    })
    .catch(next);
});

//GET, trae todas las Review del producto
server.get("/:id/reviews", (req, res) => {
  const { id } = req.params;
  Product.findOne({
    where: {
      id: id,
    },
    include: { model: Reviews },
  }).then((product) => {
    console.log(product);
    if (!product) {
      return res
        .status(404)
        .json({ message: "No se encontro Producto con ese id" });
    }
    res.send(product.reviews);
  });
});

//POST, crea o agrega Review

server.post("/:id/reviews", (req, res) => {
  var producto;
  const { title, description, value, date } = req.body;
  Product.findByPk(req.params.id)
    .then((product) => {
      if (!product) {
        return res
          .status(404)
          .json({ message: "No se encontro Producto con ese id" });
      }
      producto = product;
      return Reviews.create({
        title,
        description,
        value,
        date
      });
    })
    .then((newReview) => {
      return newReview.setProduct(producto.id);
    })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

//PUT, modifica Review
server.put("/:id/reviews/:idReviews", (req, res) => {
  const { title, description, value, date } = req.body;
  var prod;
  Product.findByPk(req.params.id, { include: { model: Reviews } })
    .then((product) => {
      prod = product;
      if (!product) {
        return res
          .status(404)
          .json({ message: "No se encontro Producto con ese id" });
      }
      return Reviews.findByPk(req.params.idReviews);
    })
    .then((review) => {
      if (!review || review.productId !== prod.id) {
        return res
          .status(404)
          .json({ message: "No se encontro Producto con ese id" });
      } else {
        r = review;
        review.title = title;
        review.description = description;
        review.value = value;
        review.date = date
        return r.save();
      }
    })

    .then((result) => {
      res.status(200).send();
      return;
    });
});

// DELETE, borra las reviews

server.delete("/:id/reviews/:idReviews", (req, res) => {
  var producto1;
  Product.findByPk(req.params.id, { includes: { model: Reviews } })
    .then((product) => {
      producto1 = product;
      if (!product) {
        return res
          .status(404)
          .json({ message: "No se encontro Producto con ese id" });
      }
      return Reviews.findByPk(req.params.idReviews);
    })
    .then((review) => {
      if (!review || review.productId !== producto1.id) {
        return res
          .status(404)
          .json({ message: "No se encontro review con ese id" });
      }
      producto1.removeReview(review.id);
      return res
        .status(200)
        .json({ message: "Se borro el reviwe correctamente" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = server;
