'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', { 	
    id: { type: Number, default: '', autoIncrement: true },
    name: { type: String, default: '' }
  });
  //adminGroupSchema.plugin(require('./plugins/pagedFind'));

  return Group;
};