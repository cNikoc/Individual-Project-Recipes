const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  
  sequelize.define('dietTypes', {
    name: {
      type: DataTypes.STRING,
    }
  }, {timestamps: false});
};

