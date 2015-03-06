'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Wine = sequelize.define('Wine', { 
    id: { type: Sequelize.INTEGER, autoIncrement: true },
    grape: { type: Sequelize.STRING },
    estate: { type: Sequelize.STRING },
    name: { type: Sequelize.STRING },
    notes: { type: Sequelize.STRING },
    rating: { type: Sequelize.STRING },
    createdBy: { type: Sequelize.STRING }
  });
 
  //createdAt and updatedAt are auto-created by sequelize
  //return Wine;
  return Wine;

};