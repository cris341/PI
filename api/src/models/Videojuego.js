const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videojuego', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Descripcion:{
      type: DataTypes.TEXT,
    },
    Fecha_de_lanzamiento:{
      type: DataTypes.DATEONLY,
    },
    Rating:{
      type: DataTypes.FLOAT,
    },
    Plataformas:{
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    image:{
      type: DataTypes.STRING,
    }
  },{
    createdAt: false,
    updatedAt: false,
  });
};
