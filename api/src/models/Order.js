const { DataTypes } = require('sequelize');
/*Una orden debe pertenecer a un usuario.
Las ordenes deben tener línea de orden que contiene el precio, productId, y cantidad.
Si un usuario completa una orden, esa orden debe mantener el precio del item al momento de la compra, 
sin importar que el precio del producto cambie después.
estado (carrito, creada, procesando, cancelada, completa)*/
module.exports = (sequelize) => {
    sequelize.define('order', {
        state: {
            type: DataTypes.ENUM,
            values: ['cart', 'created', 'processing', 'cancelled', 'complete'],
            allowNull: false
        },
        date:{
            type: DataTypes.STRING
        }
    })
}