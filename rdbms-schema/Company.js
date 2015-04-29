'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define('Company', { 	
    id: { type: Number, default: '', autoIncrement: true },
    name: { type: String, default: '' },
    createdById: { type: String, default: '' },
    createdByName: { type: String, default: '' },
    createdTime: { type: Date, default: Date.now }
  });
  //adminGroupSchema.plugin(require('./plugins/pagedFind'));

  return Company;
};
