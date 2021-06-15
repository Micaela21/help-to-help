//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");

const {
  conn,
  Product,
  Category,
  productcategory,
  User,
  Order,
  Orderline,
} = require("./src/db.js");

const {
  initialCategories,
  initialProducts,
  productCategory,
  initialUsers,
  initialOrders,
  initialOrderlines,
  //orderlines
} = require("./src/seed.js");

//const Category = require("./src/models/Category.js");
// Syncing all the models at once.
conn
  .sync({ force: false})
  .then(() => {
    server.listen(3001, () => {
      console.log("server listening at 3001"); // eslint-disable-line no-console
    });
  })
  // .then(() => {
  //    Category.bulkCreate(initialCategories);
  //  })
  //  .then(() => {
  //    Product.bulkCreate(initialProducts);
  //  })
  //  .then(() => {
  //    productcategory.bulkCreate(productCategory);
  //  })
  //   .then(() => {
  //    const users = initialUsers.map(u => User.create(u, {individualHooks: true}))
  //     Promise.all(users)

  //   .then(() => {
  //     Order.bulkCreate(initialOrders);
  //   })
  //   .then(() => {
  //     Orderline.bulkCreate(initialOrderlines);
  //   })
  // })
  .catch((error) => console.log("Error al bulkcreate", error));
