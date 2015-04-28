'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', { 
    id: { type: Number, default: '', autoIncrement: true },
    name: { type: String, default: '' },
    createdById: { type: String, default: '' },
    createdByName: { type: String, default: '' },
    createdTime: { type: Date, default: Date.now }
  });
  //Account.plugin(require('./plugins/pagedFind'));
  
   return Role;
};
