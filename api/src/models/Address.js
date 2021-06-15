const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("address", {
    
    codigoPostal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
      },
      provincia: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      localidad: {
        type: DataTypes.STRING,
        allowNull: false,
       
      },
      calle: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
      },
      pisodpto: {
        type: DataTypes.TEXT,
        
      },

  });
};