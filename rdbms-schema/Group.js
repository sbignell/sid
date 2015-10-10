'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', { 	
    id: { type: Number, default: '', autoIncrement: true },
    name: { type: String, default: '' },
    company: { type: String, default: '' },
    createdById: { type: String, default: '' },
    createdByName: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  //adminGroupSchema.plugin(require('./plugins/pagedFind'));

  return Group;
};
