'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {   
    id: { type: Number, default: '', autoIncrement: true },
    pivot: { type: String, default: '' },
    name: { type: String, default: '' }
  });
  //categorySchema.plugin(require('./plugins/pagedFind'));

  return Category;
};
