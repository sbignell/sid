'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Wine = sequelize.define('Wine', { 
    id: { type: Number, default: '', autoIncrement: true },
    grape: { type: String, default: '' },
    estate: { type: String, default: '' },
    name: { type: String, default: '' },
    notes: { type: String, default: '' },
    rating: { type: String, default: '' },
    createdById: { type: String, default: '' },
    createdByName: { type: String, default: '' },
    createdTime: { type: Date, default: Date.now }
  });
 
  //return Wine;
  return Wine;

};