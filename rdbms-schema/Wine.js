'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Wine = sequelize.define('Wine', { 
    id: { type: Number, default: '', autoIncrement: true },
    grape: { type: String, default: '' },
    estate: { type: String, default: '' },
    name: { type: String, default: '' },
    notes: { type: String, default: '' },
    rating: { type: String, default: '' },
    createdBy: { type: String, default: '' }
  });
 
  //return Wine;
  return Wine;

};