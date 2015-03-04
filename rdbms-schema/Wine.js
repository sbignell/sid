'use strict';

exports = module.exports = function(app, sequelize) {
  var Wine = sequelize.define('Wine', { 
    id: { type: String, default: '' },
    grape: { type: String, default: '' },
    estate: { type: String, default: '' },
    name: { type: String, default: '' },
    notes: { type: String, default: '' },
    pairing: { type: String, default: '' },
    rating: { type: String, default: '' },
    year: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, default: '' }
  });
 
  //return Wine;
  return Wine;

};