const { DataTypes } = require('sequelize');

/*El modelo de Línea de orden es en realidad una tabla 
intermedia que conecta a las ordenes con los productos (una orden puede
 tener muchos producos, y un producto puede estar en muchas ordenes).
Pero además de las FK de producto y orden, va tener atributos como: 
cantidad, precio, etc..*/

module.exports = (sequelize) => {
    sequelize.define('OrderLine', {
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { isInt: true }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}