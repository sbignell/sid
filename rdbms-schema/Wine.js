'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Wine = sequelize.define('Wine', { 
    id: { type: sequelize.INTEGER, autoIncrement: true },
    grape: { type: sequelize.STRING },
    estate: { type: sequelize.STRING },
    name: { type: sequelize.STRING },
    notes: { type: sequelize.STRING },
    rating: { type: sequelize.STRING },
    createdBy: { type: sequelize.STRING }
  });
 
  //createdAt and updatedAt are auto-created by sequelize
  //return Wine;
  return Wine;

};