const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4(),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumePlate: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    puntuation: {
      type: DataTypes.REAL
    },
    healthyLevel: {
      type: DataTypes.REAL
    },
    stepByStep: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.STRING
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {timestamps: false});
};


