'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', { 
    id: { type: Number, default: '', autoIncrement: true },
    name: { type: String, default: '' },
    company: { type: Number, default: '' },
    createdById: { type: Number, default: '' },
    createdByName: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  //Account.plugin(require('./plugins/pagedFind'));
  
   return Role;
};
