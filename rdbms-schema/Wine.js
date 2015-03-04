'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Wine = sequelize.define('Wine', { 
    grape: DataTypes.STRING,
    estate: DataTypes.STRING,
    name: { type: String, default: '' },
    notes: DataTypes.STRING,
    pairing: DataTypes.STRING,
    rating: DataTypes.STRING,
    year: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
 
  return Wine;

};