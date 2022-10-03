const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Genero', {
    Nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{
    createdAt: false,
    updatedAt: false,
  });
};
