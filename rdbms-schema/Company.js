'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define('Company', { 	
    id: { type: Number, default: '', autoIncrement: true },
    name: { type: String, default: '' }
  });
  //adminGroupSchema.plugin(require('./plugins/pagedFind'));

  return Company;
};
